import os
import json
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from google.cloud import translate_v2 as translate



def home(request):
    return render(request, 'api/index.html')


os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="/home/shef/Desktop/PycharmProjects/translate/translate-286421-ba867acd1adc.json"

"""Translates text into the target language.

Target must be an ISO 639-1 language code.
See https://g.co/cloud/translate/v2/translate-reference#supported_languages
"""


# get data from api page
# API info is sent in list 0 language detected, 1 what is translated
@api_view(['POST', 'GET'])
def api(request):
    json_request = request.data
    text_for_translation = json_request.get('data')
    translate_language = json_request.get('target')
    source_lan = json_request.get('input')
    translate_client = translate.Client()
    if source_lan == 'default lan':
        result = translate_client.translate(text_for_translation, target_language=translate_language)
        # result = {'translatedText': 'Hello', 'detectedSourceLanguage': 'es', 'input': 'hola'}
        result = [result.get('detectedSourceLanguage'), result.get('translatedText')]
        return Response(result)
    else:
        result = translate_client.translate(text_for_translation, target_language=translate_language, source_language=source_lan)
        # result = {'translatedText': 'Hello', 'detectedSourceLanguage': 'es', 'input': 'hola'}
        result = [result.get('detectedSourceLanguage'), result.get('translatedText')]
        return Response(result)
