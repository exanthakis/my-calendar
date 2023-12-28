import ActivityForm from "../components/ActivityForm";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Activities from "../components/Activities";

export default async function WatchList() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user;
  const { data: activities, error } = await supabase
    .from("activities")
    .select("*")
    .eq("user_id", user.id)
    .order("title", { ascending: true });

  if (error) console.error("Error fetching activities");

  console.log(user);

  if (user && user.user_metadata) {
    console.log(user.user_metadata.full_name);
  }

  const userIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="#152b32"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z"
          clipRule="evenodd"
        />
      </svg>
    );
  };
  return (
    <div className="min-h-screen bg-[var(--custom-color-brand)] text-gray-300">
      <div className="container mx-auto p-6 sm:p-12">
        <div className="flex justify-center md:justify-between items-center md:items-start relative gap-5  flex-col md:flex-row pb-12">
          <h1 className="font-Yellowtail text-5xl md:text-6xl font-extrabold ">
            My Calendar
          </h1>

          {user && user.user_metadata && (
            <>
              <ul className="relative md:absolute flex gap-2 max-w-[280px] bg-white rounded-lg md:right-0 md:top-0 shadow-lg">
                <li>
                  <details className="group">
                    <summary className="flex items-center justify-between gap-2 p-2 font-medium marker:content-none hover:cursor-pointer">
                      <span className="flex gap-2">
                        {user.user_metadata.avatar_url ? (
                          <img
                            className="w-6 h-6 rounded-full"
                            src={user.user_metadata.avatar_url}
                            alt="avatar photo"
                          />
                        ) : (
                          userIcon()
                        )}

                        <span className="text-gray-800">
                          {user.user_metadata.full_name}
                        </span>
                      </span>
                      <svg
                        className="w-5 h-5 text-gray-800 transition group-open:rotate-90"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="#152b32"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                        ></path>
                      </svg>
                    </summary>

                    <article className="px-4 pb-4 pl-2">
                      <ul className="flex flex-col gap-4 mt-4">
                        <li className="flex gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="#152b32"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                            ></path>
                          </svg>

                          {activities && (
                            <span className="text-gray-800">
                              Total activities: {activities.length}
                            </span>
                          )}
                        </li>

                        <form action="/auth/signout" method="post">
                          <button
                            type="submit"
                            className="bg-[var(--custom-color-secondary)] shadow  hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-[30px] w-full"
                          >
                            Sign out
                          </button>
                        </form>
                      </ul>
                    </article>
                  </details>
                </li>
              </ul>
            </>
          )}
        </div>
        <ActivityForm />
        <Activities activities={activities} />
      </div>
    </div>
  );
}
