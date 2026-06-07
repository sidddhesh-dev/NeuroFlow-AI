from apps.workspace.services.embedding_service import EmbeddingService
from apps.workspace.services.similarity_service import SimilarityService

class RetrivalService:
    @staticmethod
    def find_best_chunk(question,document,top_k=3):
        question_embedding=EmbeddingService.generate_embedding(question) 
        best_chunks=[]
        contexts=[]
        for chunk in document.chunks.all():
            chunk_embedding=EmbeddingService.generate_embedding(chunk.chunk_text)
            score=SimilarityService.check_similarity(question_embedding,chunk_embedding)
            best_chunks.append((score,chunk))
            best_chunks.sort(key=lambda x:x[0],reverse=True)
            top_chunks = best_chunks[:top_k]
            contexts = []
        for score, chunk in top_chunks:
            contexts.append(chunk.chunk_text)

        return "\n\n".join(contexts)
        