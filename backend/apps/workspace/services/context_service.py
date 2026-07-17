
from apps.workspace.models import *

class ContextService:
    @staticmethod
    def context_builder(
        question,
        retrieved_context,
        chat_history=None,
        chat_summary=None
    ):

        context = ""
        
        if chat_summary:
            context += (
                "=== Chat Summary ===\n"
                f"{chat_summary}\n\n")
        
        if chat_history:
            context += (
                "=== Recent Conversation ===\n"
                f"{chat_history}\n\n")
        
        if retrieved_context:
            context += (
                "=== Retrieved Document Context ===\n"
                f"{retrieved_context}\n\n")
        
        context += (
            "=== Current Question ===\n"
            f"{question}")
        
        return context