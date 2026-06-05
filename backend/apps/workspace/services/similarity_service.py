from sklearn.metrics.pairwise import cosine_similarity

class SimilarityService:

    @staticmethod
    def check_similarity(embedding1,embedding2):
        similarity=cosine_similarity([embedding1],[embedding2])
        return similarity[0][0]
