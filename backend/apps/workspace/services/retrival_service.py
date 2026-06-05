from apps.workspace.services.embedding_service import EmbeddingService
from apps.workspace.services.similarity_service import SimilarityService
from apps.workspace.models import Document,DocumentChunk

class RetrivalService:
    @staticmethod
    def find_best_chunk(question,document):
        question_embedding=EmbeddingService.generate_embedding(question)
        best_score=0 
        best_chunk=None
        for chunk in document.chunks.all():
            chunk_embedding=EmbeddingService.generate_embedding(chunk.chunk_text)
            score=SimilarityService.check_similarity(question_embedding,chunk_embedding)
            if score > best_score:
                best_score=score
                best_chunk=chunk
        return best_chunk