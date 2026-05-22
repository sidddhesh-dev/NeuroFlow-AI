from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def homepage(request):
    return Response(
        {
            "message":"account page lodingg successfully",
            "status":"success"
        }
    )
