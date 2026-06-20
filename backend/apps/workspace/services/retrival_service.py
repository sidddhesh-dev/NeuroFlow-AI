from apps.workspace.services.embedding_service import EmbeddingService
from apps.workspace.services.chromadb_service import VectorStoreService

class RetrivalService:
    @staticmethod
    def retrive_context(question,document,top_k=3):
        question_embedding=EmbeddingService.generate_embedding(question) 
        top_chunks=VectorStoreService.search_chunks(question_embedding=question_embedding,document=document,top_k=top_k)
        context = "\n\n".join(top_chunks)
            
        return context
        