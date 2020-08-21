from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view


def home(request):
    return render(request, 'api/index.html')


@api_view(['POST', 'GET'])
def api(request):
    print(str(request.data))
    return Response('working')
