from django.urls import path
from .views import (RegisterAPIView, CurrentUserAPIView,UserSettingsAPIView,
                    AccountSecurityAPIView,ChangePasswordAPIView,DeleteAccountAPIView)


urlpatterns = [
    path("register/",RegisterAPIView.as_view(),name="register"),
    path("user/",CurrentUserAPIView.as_view(),name="current-user"),
    path("settings/",UserSettingsAPIView.as_view(),name="user-settings"),
    path( "account-security/", AccountSecurityAPIView.as_view(), name="account-security"),
    path( "change-password/", ChangePasswordAPIView.as_view(), name="change-password"),
    path( "delete-account/", DeleteAccountAPIView.as_view(), name="delete-account")
]