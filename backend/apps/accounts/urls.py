from django.urls import path
from . import views
from .mixin_views import UserListCreateMixinView,UserDetailMixinView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication


urlpatterns=[
    path('users/',UserListCreateMixinView.as_view()),
    path('users/<int:PK>/',UserDetailMixinView.as_view()),
    
]