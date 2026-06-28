
from sentence_transformers import SentenceTransformer


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