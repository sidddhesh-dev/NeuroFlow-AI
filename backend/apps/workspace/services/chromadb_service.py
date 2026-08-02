import chromadb
import hashlib


class VectorStoreService:

    @staticmethod
    def get_client():
        return chromadb.PersistentClient(
            path="./chromadb"
        )

    @staticmethod
    def get_collection():
        client = VectorStoreService.get_client()

        return client.get_or_create_collection(
            name="document_chunks"
        )

    @staticmethod
    def add_chunks(document, chunks, embeddings):

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

        collection = VectorStoreService.get_collection()

        collection.add(
            ids=ids,
            documents=chunks,
            embeddings=embeddings,
            metadatas=metadatas,
        )

    @staticmethod
    def search_chunks(document, question_embedding, top_k=3):

        collection = VectorStoreService.get_collection()

        results = collection.query(
            query_embeddings=[question_embedding],
            n_results=top_k,
            where={
                "document_id": str(document.id)
            },
        )

        print("\n========== CHROMA SEARCH ==========")
        print("Searching Document ID :", document.id)
        print("Searching File        :", document.file.name)
        print("Returned IDs          :", results["ids"])
        print("Returned Documents    :", results["documents"])
        print("===================================\n")

        if not results["documents"] or not results["documents"][0]:
            return []

        return results["documents"][0]

    @staticmethod
    def delete_vector(document):

        collection = VectorStoreService.get_collection()

        collection.delete(
            where={
                "document_id": str(document.id)
            }
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

        collection = (
            VectorStoreService.get_semantic_cache_collection()
        )

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
    def search_semantic_cache(document, question_embedding):

        collection = (
            VectorStoreService.get_semantic_cache_collection()
        )

        results = collection.query(
            query_embeddings=[question_embedding],
            n_results=1,
            where={
                "document_id": str(document.id)
            },
        )

        return results

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

        if not results["ids"][0]:
            return None

        distance = results["distances"][0][0]

        if distance <= threshold:
            return results["metadatas"][0][0]["answer"]

        return None