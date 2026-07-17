from .retrieval_service import RetrievalService
from apps.workspace.services.context_service import ContextService
from apps.workspace.services.chat_service import ChatService
from apps.workspace.services.llm_service import LLMService
from apps.workspace.services.summary_service import SummaryService
from apps.workspace.services.cache_keys import generate_cache_key
from apps.workspace.services.redis_service import RedisService
from apps.workspace.services.prompt_service import PromptService
import logging
logger=logging.getLogger(__name__)

class AiService:

    @staticmethod
    def generate_answer(question, user, document):

        session = ChatService.get_or_create_session(user, document)
        chat_summary = SummaryService.get_or_create_summary(session)
        ChatService.save_messages(session, "user", question)
        cache_key = generate_cache_key(question,document.id)
        cached_answer = RedisService.get(cache_key)
        if cached_answer:
            logger.info("Cache hit for LLM response")
            ChatService.save_messages(
                session,
                "assistant",
                cached_answer
            )
            return cached_answer
        logger.info("Chche miss for LLM response")
        chat_history = ChatService.get_chat_history(session)
        retrieved_context = RetrievalService.retrieve_context(question,document)
        context = ContextService.context_builder(
            question=question,
            retrieved_context=retrieved_context,
            chat_history=chat_history,
            chat_summary=chat_summary.summary if chat_summary.summary else None
        )
        prompt = PromptService.build_prompt(question, context)
        
        answer = LLMService.generate(prompt)
        RedisService.set(
            cache_key,
            answer,
            timeout=86400
        )
        ChatService.save_messages(
            session,
            "assistant",
            answer
        )
        if SummaryService.should_update_summary(session):
            recent_messages = ChatService.get_chat_history(session)
            summary_text = SummaryService.generate_summary(
                old_summary=chat_summary.summary,
                recent_messages=recent_messages
            )
            SummaryService.update_summary(
                session,
                summary_text
            )
        return answer
        
        
            


        