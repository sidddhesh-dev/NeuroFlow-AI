import chromadb
import hashlib

# Retrieve document chunks using semantic vector search with a Python fallback.
class VectorStoreService:
    @staticmethod
    def get_client():
        return chromadb.PersistentClient(path="./chromadb")
    @staticmethod
    def get_collection():
        client = VectorStoreService.get_client()
        return client.get_or_create_collection(name="document_chunks")
    @staticmethod
    def add_chunks(document, chunks, embeddings):
        collection = VectorStoreService.get_collection()
        ids = [
            f"doc_{document.id}_chunk_{i}"
            for i in range(len(chunks))
        ]
        metadatas = [
            {
                "document_id": str(document.id),
                "chunk_index": i,
            }
            for i in range(len(chunks))
        ]
        collection.add(
            ids=ids,
            documents=chunks,
            embeddings=embeddings,
            metadatas=metadatas,
        )
    @staticmethod
    def search_chunks(document, question_embedding, top_k=3):
        collection = VectorStoreService.get_collection()
        try:
            results = collection.query(
                query_embeddings=[question_embedding],
                n_results=top_k,
                where={"document_id": str(document.id)},
            )
            documents = results.get("documents")
            if documents is not None and len(documents) > 0:
                if documents[0] is not None and len(documents[0]) > 0:
                    return documents[0]
        except Exception:
            pass
        return VectorStoreService._fallback_search(
            collection,
            document,
            question_embedding,
            top_k,
        )
    @staticmethod
    def _fallback_search(
        collection,
        document,
        question_embedding,
        top_k,
    ):
        try:
            stored_data = collection.get(
                where={"document_id": str(document.id)},
                include=["documents", "embeddings"],
            )
        except Exception:
            return []
        documents = stored_data.get("documents")
        embeddings = stored_data.get("embeddings")
        if documents is None or len(documents) == 0:
            return []
        if embeddings is None or len(embeddings) == 0:
            return []
        scored_chunks = []
        for index, embedding in enumerate(embeddings):
            if embedding is None or len(embedding) == 0:
                continue
            if len(question_embedding) != len(embedding):
                continue
            distance = sum(
                (query_value - chunk_value) ** 2
                for query_value, chunk_value in zip(
                    question_embedding,
                    embedding,
                )
            )
            scored_chunks.append((distance, index))
        scored_chunks.sort(key=lambda item: item[0])
        return [
            documents[index]
            for _, index in scored_chunks[:top_k]
        ]
    @staticmethod
    def delete_vector(document):
        collection = VectorStoreService.get_collection()
        collection.delete(
            where={"document_id": str(document.id)}
        )
    @staticmethod
    def get_semantic_cache_collection():
        client = VectorStoreService.get_client()
        return client.get_or_create_collection(
            name="semantic_cache"
        )
    @staticmethod
    def add_semantic_cache(
        document,
        question,
        question_embedding,
        answer,
    ):
        collection = VectorStoreService.get_semantic_cache_collection()
        cache_id = hashlib.sha256(
            f"{document.id}:{question}".encode()
        ).hexdigest()
        collection.add(
            ids=[cache_id],
            documents=[question],
            embeddings=[question_embedding],
            metadatas=[
                {
                    "document_id": str(document.id),
                    "answer": answer,
                }
            ],
        )
    @staticmethod
    def search_semantic_cache(
        document,
        question_embedding,
    ):
        collection = VectorStoreService.get_semantic_cache_collection()
        try:
            return collection.query(
                query_embeddings=[question_embedding],
                n_results=1,
                where={"document_id": str(document.id)},
            )
        except Exception:
            return {
                "ids": [[]],
                "documents": [[]],
                "metadatas": [[]],
                "distances": [[]],
            }
    @staticmethod
    def get_semantic_cache_hit(
        document,
        question_embedding,
        threshold=0.25,
    ):
        results = VectorStoreService.search_semantic_cache(
            document,
            question_embedding,
        )
        ids = results.get("ids")
        if ids is None or len(ids) == 0:
            return None
        if ids[0] is None or len(ids[0]) == 0:
            return None
        distance = results["distances"][0][0]
        if distance <= threshold:
            return results["metadatas"][0][0]["answer"]
        return None