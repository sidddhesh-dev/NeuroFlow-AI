from django.urls import path
from . import views
from .mixin_views import UserListCreateMixinView,UserDetailMixinView

urlpatterns=[
    path('users/',UserListCreateMixinView.as_view()),
    path('users/<int:PK>/',UserDetailMixinView.as_view())
]