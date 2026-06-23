import chromadb

class VectorStoreService:
    @staticmethod
    def get_client():
        client=chromadb.PersistentClient(
            path='./chromadb'
        )
        return client

    @staticmethod
    def get_collection():
        client=VectorStoreService.get_client()
        collection=client.get_or_create_collection(
            name='document_chunks'
        )
        return collection
    
    @staticmethod
    def add_chunks(document,chunks,embeddings):
        ids = [
        f"doc_{document.id}_chunk_{i}"
        for i in range(len(chunks))
    ]

        metadatas = [
        {
            "document_id": document.id,
            "chunk_index": i
        }
        for i in range(len(chunks))
    ]

        collection = VectorStoreService.get_collection()
        collection.add(
        documents=chunks,
        embeddings=embeddings,
        metadatas=metadatas,
        ids=ids
    )
        
    @staticmethod
    def search_chunks(document, question_embedding, top_k=3):

        collection = VectorStoreService.get_collection()

        results = collection.query(
            query_embeddings=[question_embedding],
            n_results=top_k,
            where={"document_id": document.id})
        top_chunks = results["documents"][0]
        return top_chunks

    @staticmethod 
    def delete_vector(document):
        collection=VectorStoreService.get_collection()
        collection.delete(
            where={
                "document_id":document.id
            }
        )