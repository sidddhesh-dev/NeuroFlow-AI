from apps.workspace.services.retrival_service import RetrivalService
from apps.workspace.services.context_service import ContextService
from apps.workspace.services.chat_service import ChatService
from apps.workspace.services.llm_service import LLMService
from apps.workspace.services.summary_service import SummaryService
from apps.workspace.services.cache_keys import generate_cache_key
from apps.workspace.services.redis_service import RedisService
from apps.workspace.services.prompt_service import PromptService

class AiService:

    @staticmethod
    def generate_answer(question, user, document):

        session = ChatService.get_or_create_session(user, document)
        summary = SummaryService.get_or_create_summary(session)
        ChatService.save_messages(session, "user", question)
        chat_history = ChatService.get_chat_history(session)
        retrived_context = RetrivalService.retrive_context(
            question,
            document
        )
        context = ContextService.context_builder(
            question=question,
            retrived_context=retrived_context,
            chat_history=chat_history,
            summary=summary.summary
        )
        prompt = PromptService.build_prompt(question, context)
        cache_key = generate_cache_key(question,document.id)
        cached_answer = RedisService.get(cache_key)
        if cached_answer:
            print("CACHE HIT")
            ChatService.save_messages(
                session,
                "assistant",
                cached_answer
            )
            return cached_answer
        print("CACHE MISS")
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
        recent_messages = ChatService.get_chat_history(session)
        summary_text = SummaryService.generate_summary(
            old_summary=summary.summary,
            recent_messages=recent_messages
        )
        SummaryService.update_summary(
            session,
            summary_text
        )
        return answer
        
        
            


        