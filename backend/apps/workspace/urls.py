from django.urls import path
from apps.workspace.views import NoteCreateApiView,NoteDetailApiView

urlpatterns=[
    path('notes/',NoteCreateApiView.as_view(),name='notes'),
    path('notes/<int:id>/',NoteDetailApiView.as_view(),name='note_detail')
]