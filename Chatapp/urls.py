from django.urls import path
from .views import HomePage, ChatPage

urlpatterns = [
    path('', HomePage.as_view(), name='home'),
    path('chat/', ChatPage.as_view(), name='Chat')
]
