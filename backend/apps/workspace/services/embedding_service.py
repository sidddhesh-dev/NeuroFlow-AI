
from sentence_transformers import SentenceTransformer
from apps.workspace.services.cache_keys import (generate_embedding_cache_key)
from apps.workspace.services.redis_service import RedisService

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
        cache_key = generate_embedding_cache_key(text)
        cached_embedding = RedisService.get(cache_key)
        if cached_embedding:
            print("EMBEDDING CACHE HIT")
            return cached_embedding

        print("EMBEDDING CACHE MISS")

        model = EmbeddingService.get_model()

        embedding = model.encode(text).tolist()

        RedisService.set(key=cache_key,value=embedding,timeout=86400)

        return embedding
    
    @staticmethod
    def generate_embeddings(texts):
        model = EmbeddingService.get_model()
        embeddings = model.encode(texts)
        return embeddings.tolist()