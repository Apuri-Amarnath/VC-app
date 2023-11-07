from django.http import JsonResponse
from django.shortcuts import render
from django.views import View
import json


# Create your views here.
class HomePage(View):
    template_name = 'Homepage.html'
    offer_data = None
    answer_data = None


    def post(self, request):
        # Handle the POST request and return a response
        # ...
        try:
            post_data = json.loads(request.body)
            HomePage.offer_data = post_data.get('offer')

        except json.JSONDecodeError:
            # Handle JSON decoding error
            pass

        # Return a JSON response
        return JsonResponse({'message': 'Data received and processed successfully'})

    def get(self, request):
        # Access the offer_data from the get method
        if HomePage.offer_data is not None:
            self.offer_data = HomePage.offer_data
            #print(self.offer_data + 'offerdata')
        # Handle other HTTP methods (e.g., GET) if needed

        # Return an HTML response
        return render(request, self.template_name)

