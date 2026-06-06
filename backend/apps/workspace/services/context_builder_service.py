

class ContextBuilderService:
    @staticmethod
    def context_builder(top_chunks):
        contexts=[]
        for score ,chunk in top_chunks:
            contexts.append(chunk.chunk_text)
        context="\n\n".join(contexts)
        return context


