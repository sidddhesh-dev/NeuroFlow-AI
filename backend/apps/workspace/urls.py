from django.urls import path
from apps.workspace.views import NoteCreateApiView,NoteDetailApiView,DocumentCreateView,DocumentDetailView,DocumentAskQuestionView,ChatSessionCreateView,ChatSessionDetailView,ChatSessionListView

urlpatterns=[
    path('notes/',NoteCreateApiView.as_view(),name='notes'),
    path('notes/<int:id>/',NoteDetailApiView.as_view(),name='note_detail'),
    path('documents/',DocumentCreateView.as_view(),name='documents'),
    path('documents/<int:id>/',DocumentDetailView.as_view(),name='doc_detail'),
    path('documents/<int:id>/ask/',DocumentAskQuestionView.as_view(),name="doc_answer"),
    path("chat-sessions/", ChatSessionCreateView.as_view(), name="chat_session_create"),
    path("chat-sessions/list/",ChatSessionListView.as_view(),name="chat_list"),
    path("chat-sessions/<int:id>/",ChatSessionDetailView.as_view(),name="chat_detail")
]