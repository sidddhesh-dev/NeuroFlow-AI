from apps.workspace.services.embedding_service import EmbeddingService
from apps.workspace.services.chromadb_service import VectorStoreService
import logging
logger=logging.getLogger(__name__)

class RetrievalService:
    @staticmethod
    def retrieve_context(question,document,top_k=3):
        question_embedding=EmbeddingService.generate_embedding(question) 
        top_chunks=VectorStoreService.search_chunks(question_embedding=question_embedding,document=document,top_k=top_k)
        if not top_chunks:
            return ""
        
        context = "\n\n".join(top_chunks)
        logger.info(f"Retrieved {len(top_chunks)} relevant chunks.")    
        return context
        