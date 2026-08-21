from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect, render


def loading(request):

    if request.user.is_authenticated:
        return redirect("dashboard")

    return render(request, "public/loading.html")


def welcome(request):
    return render(request, "public/welcome.html")


def login_page(request):

    if request.user.is_authenticated:
        return redirect("dashboard")

    return render(
        request,
        "public/login.html"
    )


@login_required
def dashboard(request):
    return render(request, "dashboard.html")

@login_required
def activity(request):
    return render(request, "activity/activity.html")


def privacy_policy(request):
    return render(
        request,
        "legal/privacy_policy.html"
    )


def terms_of_service(request):
    return render(
        request,
        "legal/terms_of_service.html"
    )