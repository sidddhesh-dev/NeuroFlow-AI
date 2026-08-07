from django.urls import path
from apps.workspace.views import (NoteCreateApiView,NoteDetailApiView,DocumentCreateView,DocumentDetailView,
    DocumentAskQuestionView,ChatSessionCreateView,ChatSessionDetailView,
    ChatSessionListView , ChatSessionRenameView,ChatSessionPinView,ChatSessionUnpinView,SearchView,HistoryView,
    ModelStatusView)

urlpatterns=[
    path('notes/',NoteCreateApiView.as_view(),name='notes'),
    path('notes/<int:id>/',NoteDetailApiView.as_view(),name='note_detail'),
    path('documents/',DocumentCreateView.as_view(),name='documents'),
    path('documents/<int:id>/',DocumentDetailView.as_view(),name='doc_detail'),
    path('documents/<int:id>/ask/',DocumentAskQuestionView.as_view(),name="doc_answer"),
    path("chat-sessions/", ChatSessionCreateView.as_view(), name="chat_session_create"),
    path("chat-sessions/list/",ChatSessionListView.as_view(),name="chat_list"),
    path("chat-sessions/<int:id>/",ChatSessionDetailView.as_view(),name="chat_detail"),
    path("chat-sessions/<int:id>/rename/",ChatSessionRenameView.as_view(),name="chat_rename"),
    path("chat-sessions/<int:id>/pin/", ChatSessionPinView.as_view(),name="chat_pin"),
    path("chat-sessions/<int:id>/unpin/",ChatSessionUnpinView.as_view(),name="chat_unpin"),
    path("search/",SearchView.as_view(),name="search"),
    path("history/",HistoryView.as_view(),name="history"),
    path("model/",ModelStatusView.as_view(),name="model_status",
),
]