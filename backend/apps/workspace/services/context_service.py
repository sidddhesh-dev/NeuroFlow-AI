
from apps.workspace.services.chat_service import ChatService
from apps.workspace.models import *

class ContextService:
    @staticmethod
    def context_builder(
        question,
        retrived_context,
        chat_history=None,
        workspace_context=None
    ):

        context = f"""
    WORKSPACE CONTEXT:
    {workspace_context or "None"}
    
    PREVIOUS CONVERSATION:
    {chat_history or "No previous conversation"}
    
    DOCUMENT INFORMATION:
    {retrived_context}
    
    CURRENT QUESTION:
    {question}
    
    IMPORTANT INSTRUCTIONS:
    
    1. Use the PREVIOUS CONVERSATION to resolve references such as:
    - it
    - this
    - that
    - which one
    - previous topic
    
    2. Questions may depend on earlier questions and answers.
    3. Combine information from previous conversation and document information.
    4. If the user asks "which one", "why", "where is it used", "tell me more", or similar follow-up questions, assume they refer to the most recently discussed entities.
    5. Give a natural conversational answer rather than treating each question independently.
"""

        return context