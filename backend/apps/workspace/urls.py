from django.urls import path
from apps.workspace.views import NoteCreateApiView,NoteDetailApiView,DocumentCreateView,DocumentDetailView,DocumentAskQuestionView

urlpatterns=[
    path('notes/',NoteCreateApiView.as_view(),name='notes'),
    path('notes/<int:id>/',NoteDetailApiView.as_view(),name='note_detail'),
    path('documents/',DocumentCreateView.as_view(),name='documents'),
    path('documents/<int:id>/',DocumentDetailView.as_view(),name='doc_detail'),
    path('documents/<int:id>/ask/',DocumentAskQuestionView.as_view(),name="doc_answer")
]