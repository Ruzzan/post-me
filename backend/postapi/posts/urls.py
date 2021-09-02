from django.urls import path
from .views import PostListAPI,PostRetrieveAPI,UserViewSet,UserPostListAPI,UserPostAPI
from rest_framework.routers import SimpleRouter

urlpatterns = [
    path('',PostListAPI.as_view(),name='posts'),
    path('<int:pk>/',PostRetrieveAPI.as_view(),name='detail'),
    path('user/',UserPostListAPI.as_view(),name='user-post'),
    path('user/<int:pk>/',UserPostAPI.as_view(),name='user'),
]

router = SimpleRouter()
router.register('users',UserViewSet,basename='users')

urlpatterns += router.urls