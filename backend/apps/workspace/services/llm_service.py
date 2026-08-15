import os
import time
import logging
from django.conf import settings
logger = logging.getLogger(__name__)


class LLMService:
    @staticmethod
    def get_gemini_client():
        from google import genai
        api_key = os.getenv("GEMINI_API_KEY")
        return genai.Client(api_key=api_key)

    @staticmethod
    def get_openAi_client():
        from openai import OpenAI
        api_key = os.getenv("OPENAI_API_KEY")
        return OpenAI(api_key=api_key)

    @staticmethod
    def get_groq_client():
        from groq import Groq
        api_key = os.getenv("GROQ_API_KEY")
        return Groq(api_key=api_key)

    @staticmethod
    def get_gemini_model():
        return os.getenv("GEMINI_MODEL")

    @staticmethod
    def get_openai_model():
        return os.getenv("OPENAI_MODEL")

    @staticmethod
    def get_groq_model():
        return os.getenv("GROQ_MODEL")

    @staticmethod
    def generate_gemini(prompt):
        client = LLMService.get_gemini_client()

        response = client.models.generate_content(
            model=LLMService.get_gemini_model(),contents=prompt)
        answer = response.text
        if not answer:
            raise Exception("Empty response from Gemini")

        return answer

    @staticmethod
    def generate_openAI(prompt):
        client = LLMService.get_openAi_client()

        response = client.chat.completions.create(
            model=LLMService.get_openai_model(),
            messages=[
                {"role": "user", "content": prompt},
            ],
        )

        answer = response.choices[0].message.content

        if not answer:
            raise Exception("Empty response from OpenAI")

        return answer

    @staticmethod
    def generate_groq(prompt):
        client = LLMService.get_groq_client()

        response = client.chat.completions.create(
            model=LLMService.get_groq_model(),
            messages=[
                {"role": "user", "content": prompt},
            ],
        )

        answer = response.choices[0].message.content

        if not answer:
            raise Exception("Empty response from Groq")

        return answer

    @staticmethod
    def retry(provider_function, prompt, retries=3):
        last_exception = None

        for attempt in range(retries):
            try:
                return provider_function(prompt)

            except Exception as e:
                last_exception = e

                logger.exception(
                    f"{provider_function.__name__} attempt "
                    f"{attempt + 1} failed"
                )

                time.sleep(2)

        raise Exception(
            f"{provider_function.__name__} failed after {retries} attempts."
        ) from last_exception

    @staticmethod
    def generate(prompt):
        try:
            return LLMService.retry(
                LLMService.generate_gemini,
                prompt,
            )

        except Exception:
            logger.exception("Gemini provider failed")

        try:
            return LLMService.retry(
                LLMService.generate_openAI,
                prompt,
            )

        except Exception:
            logger.exception("OpenAI provider failed")

        try:
            return LLMService.retry(
                LLMService.generate_groq,
                prompt,
            )

        except Exception:
            logger.exception("Groq provider failed")

        raise Exception("All LLM providers failed.")

    @staticmethod
    def get_status():
        provider = getattr(
            settings,
            "DEFAULT_LLM_PROVIDER",
            "Gemini",
        )

        return {
            "provider": provider,
            "status": "online",
        }