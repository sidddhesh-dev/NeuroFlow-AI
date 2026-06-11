
from apps.workspace.services.chat_service import ChatService
from apps.workspace.models import *
from django.contrib.auth.models import User 


class ContextService:
    @staticmethod
    def context_builder(question,retrived_context,chat_history=None,workspace_context=None):
        
        context = f"""
            WORKSPACE CONTEXT:
            {workspace_context or ""}

            CHAT HISTORY:
            {chat_history or ""}

            DOCUMENT CONTEXT:
            {retrived_context}

            QUESTION:
            {question}
            """

        return context