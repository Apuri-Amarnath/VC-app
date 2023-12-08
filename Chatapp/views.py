from django.http import JsonResponse
from django.shortcuts import render
from django.views import View
import json

import manage


# Create your views here.


class HomePage(View):
    template_name = 'Homepage.html'

    def post(self, request):
        # Handle the POST request and return a response
        # ...
        try:
            post_data = json.loads(request.body)
            manage.APP_DATA.data["offer"] = post_data.get('offer')

        except json.JSONDecodeError:
            # Handle JSON decoding error
            pass

        # Return a JSON response
        return JsonResponse({'message': 'offer received and processed successfully'})

    def get(self, request):
        # Access the offer_data from the get method
        answerObj =  manage.APP_DATA.data.get("answer")
        if answerObj is not None:
            print("have offer data")
        # Handle other HTTP methods (e.g., GET) if needed
        context = {'answer': answerObj}  # Return an HTML response
        return render(request, self.template_name, context)


class ChatPage(View):
    template_name = 'Chatpage.html'
    answer_data = None

    def post(self, request):
        try:
            post_data = json.loads(request.body)
            manage.APP_DATA.data["answer"] = post_data.get('answer')
        except json.JSONDecodeError:
            pass

        return JsonResponse({'message': 'answer received and processed successfully'})

    def get(self, request):
        # Access the offer_data from the get method
        offerObj = manage.APP_DATA.data.get("offer")
        context = None
        if offerObj is not None:
            # Handle other HTTP methods (e.g., GET) if needed
            context = {'offer': offerObj}
        # Return an HTML response
        return render(request, self.template_name, context)
