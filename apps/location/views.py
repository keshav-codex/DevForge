from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect

from apps.location.models import Location


@login_required
def activity(request):
    """
    Display the Map Activity page and save a location.
    """

    # Handle form submission.
    if request.method == "POST":

        # Get submitted values.
        place_name = request.POST.get("place_name", "").strip()
        status = request.POST.get("status", "").strip()
        description = request.POST.get("description", "").strip()
        address = request.POST.get("address", "").strip()
        latitude = request.POST.get("latitude", "").strip()
        longitude = request.POST.get("longitude", "").strip()

        # Validate place name.
        if not place_name:
            messages.error(
                request,
                "Please enter a place name."
            )
            return redirect("location_activity")

        # Validate status.
        if status not in ["visited", "planned"]:
            messages.error(
                request,
                "Please select Visited or Planned."
            )
            return redirect("location_activity")

        # A map selection is required.
        if not address or not latitude or not longitude:
            messages.error(
                request,
                "Please select a location on the map."
            )
            return redirect("location_activity")

        # Save the location for the logged-in user.
        Location.objects.create(
            profile=request.user.profile,
            place_name=place_name,
            status=status,
            description=description,
            address=address,
            latitude=latitude,
            longitude=longitude,
        )

        # Show success message after saving.
        messages.success(
            request,
            "Location saved successfully."
        )

        # Prevent duplicate submission on refresh.
        return redirect("map_activity")

    return render(
        request,
        "activity/map.html",
    )