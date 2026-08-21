from django.urls import path

from . import views


urlpatterns = [
    path("welcome/", views.welcome, name="welcome"),
    path("dashboard/", views.dashboard, name="dashboard"),
    path("activity/", views.activity, name="activity"),
    path("privacy-policy/", views.privacy_policy, name="privacy_policy"),
    path("terms-of-service/", views.terms_of_service, name="terms_of_service"),
    path("login/", views.login_page, name="login"),
]