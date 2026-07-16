from django.urls import path
from .views import UserListCreateAPIView,UserDetailAPIView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns=[
    path('users/',UserListCreateAPIView.as_view()),
    path('users/<int:pk>/',UserDetailAPIView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
]