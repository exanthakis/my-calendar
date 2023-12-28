"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function updateActivity(formData) {
  const id = formData.get("id");
  const description = formData.get("description");
  const title = formData.get("title");
  const referenceNumber = formData.get("referenceNumber");
  const startDate = formData.get("startDate");
  const endDate = formData.get("endDate");

  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;

  if (!user) {
    console.error(
      "User is not authenticated within updateActivity server action"
    );
    return;
  }

  const { data, error } = await supabase
    .from("activities")
    .update({
      description,
      title,
      reference_number: referenceNumber,
      startDate,
      endDate,
    })
    .match({ id, user_id: user.id });

  if (error) {
    console.error("Error updating data", error);
    return;
  }

  revalidatePath("/my-calendar");

  return { message: "Success" };
}
