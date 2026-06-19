import os
from dotenv import load_dotenv
from huggingface_hub import login
from sentence_transformers import SentenceTransformer
load_dotenv()
login(os.getenv("HF_TOKEN"))

class EmbeddingService:

    model = None

    @staticmethod
    def get_model():

        if EmbeddingService.model is None:

            EmbeddingService.model = SentenceTransformer(
                "sentence-transformers/all-MiniLM-L6-v2",
                local_files_only=True
            )

        return EmbeddingService.model


    @staticmethod
    def generate_embedding(text):

        model = EmbeddingService.get_model()

        embedding = model.encode(text)

        return embedding.tolist()
    
    @staticmethod
    def generate_embeddings(texts):

        model = EmbeddingService.get_model()

        embeddings = model.encode(texts)

        return embeddings.tolist()