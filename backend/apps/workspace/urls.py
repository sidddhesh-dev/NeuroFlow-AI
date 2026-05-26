from django.urls import path
from apps.workspace.views import NoteCreateApiView

urlpatterns=[
    path('notes/',NoteCreateApiView.as_view(),name='notes')
]