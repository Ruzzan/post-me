from django.shortcuts import render
from .models import Post
from .serializers import PostSerializer, UserSerializer
from .pagination import PostPagination
from .permissions import IsAuthorOrReadOnly
from rest_framework import generics
from rest_framework import viewsets
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
