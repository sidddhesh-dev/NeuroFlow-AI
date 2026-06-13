import os
from google import genai
from dotenv import load_dotenv
from apps.workspace.services.chat_service import ChatService


class LLMService:
    @staticmethod
    def get_gemini_client():
        api_key=os.getenv("GEMINI_API_KEY")
        client=genai.Client(api_key=api_key)
        return client
    
    @staticmethod
    def get_openAi_client():
        ...

    @staticmethod
    def get_groq_client():
        ...
    
    @staticmethod
    def generate_gemini(prompt):
        client = LLMService.get_client()
        try:
            response=client.models.generate_content(
                model="gemini-2.5-flash",
                contents=prompt )
            return response.text

        
        except Exception as e:
            print(e)
            error = str(e)
            if "429" in error:
                answer= "Daily AI quota exceeded. Please try again tomorrow."
                return answer

            if "503" in error:
                answer= "AI model is currently overloaded. Please try again in a few minutes."
                return answer

            return "AI service temporarily unavailable."
        
    @staticmethod
    def generate_openAI():
        ...

    @staticmethod
    def generate_groq():
        ...

    @staticmethod
    def generate(prompt, provider="gemini"):

        if provider == "gemini":
            return LLMService.generate_gemini(prompt)
    
        elif provider == "openai":
            return LLMService.generate_openai(prompt)
    
        elif provider == "groq":
            return LLMService.generate_groq(prompt)
    
        else:
            raise ValueError("Invalid provider")
        