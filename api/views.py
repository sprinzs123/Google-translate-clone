from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view


def home(request):
    return render(request, 'api/index.html')


# get data from api page
@api_view(['POST', 'GET'])
def api(request):
    translated = {'translatedText': 'Hello', 'detectedSourceLanguage': 'es', 'input': 'hola'}
    return Response(translated)
