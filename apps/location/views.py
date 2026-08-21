from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import render, redirect

from apps.ai.services import generate_location_description
from apps.location.models import Location


@login_required
def activity(request):
    """
    Display the Map Activity page and save a location.
    """

    # Handle form submission.
    if request.method == "POST":

        # =====================================================
        # AI LOCATION DESCRIPTION
        # =====================================================

        ai_action = request.POST.get(
            "ai_action",
            ""
        ).strip()

        if ai_action == "location_description":

            place_name = request.POST.get(
                "place_name",
                ""
            ).strip()

            status = request.POST.get(
                "status",
                ""
            ).strip()

            instruction = request.POST.get(
                "ai_instruction",
                ""
            ).strip()

            description = request.POST.get(
                "description",
                ""
            ).strip()

            # AI requires place name, status and instruction.
            if not place_name:
                return JsonResponse(
                    {
                        "success": False,
                        "error": "Please enter a place name."
                    },
                    status=400,
                )

            if status not in ["visited", "planned"]:
                return JsonResponse(
                    {
                        "success": False,
                        "error": "Please select Visited or Planned."
                    },
                    status=400,
                )

            if not instruction:
                return JsonResponse(
                    {
                        "success": False,
                        "error": "Please enter an instruction."
                    },
                    status=400,
                )

            try:

                ai_description = generate_location_description(
                    place_name=place_name,
                    status=status,
                    instruction=instruction,
                    description=description,
                )

                return JsonResponse(
                    {
                        "success": True,
                        "description": ai_description,
                    }
                )

            except Exception as error:

                print(
                    "LOCATION AI ERROR:",
                    error,
                )

                return JsonResponse(
                    {
                        "success": False,
                        "error": (
                            "Unable to generate an AI response. "
                            "Please try again."
                        ),
                    },
                    status=500,
                )


        # =====================================================
        # NORMAL LOCATION SAVE
        # =====================================================

        # Get submitted values.
        place_name = request.POST.get(
            "place_name",
            ""
        ).strip()

        status = request.POST.get(
            "status",
            ""
        ).strip()

        description = request.POST.get(
            "description",
            ""
        ).strip()

        address = request.POST.get(
            "address",
            ""
        ).strip()

        latitude = request.POST.get(
            "latitude",
            ""
        ).strip()

        longitude = request.POST.get(
            "longitude",
            ""
        ).strip()
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