from django.urls import path
from . import views
from .mixin_views import UserListCreateMixinView,UserDetailMixinView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns=[
    path('users/',UserListCreateMixinView.as_view()),
    path('users/<int:PK>/',UserDetailMixinView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
]