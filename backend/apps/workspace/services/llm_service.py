import os
from google import genai
from openai import OpenAI
from groq import Groq
import time
import logging

logger=logging.getLogger(__name__)

class LLMService:
    @staticmethod
    def get_gemini_client():
        api_key=os.getenv("GEMINI_API_KEY")
        client=genai.Client(api_key=api_key)
        return client
    
    @staticmethod
    def get_openAi_client():
        api_key=os.getenv("OPENAI_API_KEY")
        client=OpenAI(api_key=api_key)
        return client

    @staticmethod
    def get_groq_client():
        api_key=os.getenv("GROQ_API_KEY")
        client=Groq(api_key=api_key)
        return client
    
    @staticmethod
    def generate_gemini(prompt):
        client = LLMService.get_gemini_client()
        response=client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt )
        answer=response.text
        if not answer:
            raise Exception("Empty response from Gemini")
        return answer

    @staticmethod
    def generate_openAI(prompt):
        client=LLMService.get_openAi_client()

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
            {"role": "user", "content": prompt}])
        answer=response.choices[0].message.content
        if not answer:
            raise Exception("Empty response from OpenAI")
        return answer
       
            
    @staticmethod
    def generate_groq(prompt):
        client=LLMService.get_groq_client()
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "user", "content": prompt}])
        answer= response.choices[0].message.content
        if not answer:
            raise Exception("Empty response from Groq")
        return answer
       
    
    @staticmethod
    def retry(provider_function, prompt, retries=3):

        for attempt in range(retries):

            try:
                return provider_function(prompt)

            except Exception as e:

                logger.exception(f"{provider_function.__name__} attempt {attempt + 1} failed")

                time.sleep(2)

        raise Exception(f"{provider_function.__name__} failed after {retries} attempts")
        

    @staticmethod
    def generate(prompt):

        try:
            return LLMService.retry(LLMService.generate_gemini,prompt)

        except Exception as e:
            print("Gemini failed:", e)

        try:
            return LLMService.retry(LLMService.generate_openAI,prompt)

        except Exception as e:
            print("OpenAI failed:", e)

        try:
            return LLMService.retry(LLMService.generate_groq,prompt)

        except Exception as e:
            print("Groq failed:", e)

        return "AI service temporarily unavailable."
        
    