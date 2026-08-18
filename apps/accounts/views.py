from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect, render


def loading(request):

    if request.user.is_authenticated:
        return redirect("dashboard")

    return render(request, "accounts/loading.html")


def welcome(request):
    return render(request, "accounts/welcome.html")


@login_required
def dashboard(request):
    return render(request, "accounts/dashboard.html")

@login_required
def activity(request):
    return render(request, "activity/activity.html")