from django.urls import path
from . import views

urlpatterns=[
    path('users/',views.User_list),
    path('users/<int:PK>/',views.user_details)
]