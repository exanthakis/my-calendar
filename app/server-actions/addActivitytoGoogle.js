"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function addActivitytoGoogle(formData) {
  console.log("called addActivitytoGoogle");
  const description = formData.get("descriptionGoogle");
  const title = formData.get("titleGoogle");
  const startDate = formData.get("startDateGoogle");
  const endDate = formData.get("endDateGoogle");

  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;

  if (!user) {
    console.error("User is not authenticated within addActivity server action");
    return;
  }

  const event = {
    summary: title,
    description: description,
    start: {
      dateTime: startDate + ":00", // Date.toISOString() ->
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // America/Los_Angeles
    },
    end: {
      dateTime: endDate + ":00", // Date.toISOString() ->
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // America/Los_Angeles
    },
  };

  console.log(event);
  const data = await fetch(
    "https://www.googleapis.com/calendar/v3/calendars/primary/events",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + session.provider_token, // Access token for google
      },
      body: JSON.stringify(event),
    }
  )
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      if (data.error) {
        return data;
      } else {
        console.log(data);
        console.log("Event created, check your Google Calendar!");
      }
    });

  if (data && data.error) {
    console.log(data);
    return { message: data.error.status };
  }

  revalidatePath("/my-calendar");

  return { message: "Success" };
}
