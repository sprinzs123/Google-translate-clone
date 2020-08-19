from django.shortcuts import render
from django.http import HttpResponse




def home(request):
    # source = request.GET.get("source")
    if request.method == 'POST':
        print('post request')
        return HttpResponse('working')
    else:
        return render(request, 'api/index.html')
