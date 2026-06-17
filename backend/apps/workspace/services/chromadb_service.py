import chromadb

class VectorStoreService:

    def get_client():
        client=chromadb.PersistentClient(
            path='./chromadb'
        )
        return client