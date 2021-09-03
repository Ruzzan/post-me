from django.shortcuts import render
from .models import Post
from .serializers import PostSerializer, UserSerializer
from .pagination import PostPagination
from .permissions import IsAuthorOrReadOnly
from rest_framework import generics, mixins, response, status, viewsets
from django.contrib.auth import get_user_model
from dj_rest_auth.views import LoginView
# Create your views here.

class PostListAPI(generics.ListCreateAPIView):
    pagination_class = PostPagination
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class PostRetrieveAPI(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthorOrReadOnly,)
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
    pagination_class = PostPagination

class UserPostListAPI(generics.ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.filter(author=self.request.user)
    
class UserPostAPI(generics.RetrieveAPIView,mixins.UpdateModelMixin,mixins.DestroyModelMixin):
    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.filter(author = self.request.user)

    def patch(self,request,*args,**kwargs):
        return self.partial_update(request,*args,**kwargs)

    def delete(self,request,*args,**kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return response.Response(status=status.HTTP_204_NO_CONTENT)

