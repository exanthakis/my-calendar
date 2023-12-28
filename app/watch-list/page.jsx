import WatchForm from "../components/WatchForm";
import EditWatch from "../components/EditWatch";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { deleteWatch } from "../server-actions/deleteWatch";

export default async function WatchList() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user;
  const { data: watches, error } = await supabase
    .from("watches")
    .select("*")
    .eq("user_id", user.id)
    .order("brand", { ascending: true });

  if (error) console.error("Error fetching watches");

  console.log(user);

  if (user && user.user_metadata) {
    console.log(user.user_metadata.full_name);
  }

  return (
    <div className="min-h-screen bg-[--custom-color-brand] text-gray-300">
      <div className="container mx-auto p-6 sm:p-12">
        <div className="flex justify-center md:justify-between items-center md:items-start relative gap-5  flex-col md:flex-row pb-12">
          <h1 className="font-Yellowtail text-5xl md:text-6xl font-extrabold ">
            My List
          </h1>

          {user && user.user_metadata && (
            <>
              <ul className="relative md:absolute flex gap-2 max-w-[280px] bg-white rounded-lg md:right-0 md:top-0">
                <li>
                  <details className="group">
                    <summary className="flex items-center justify-between gap-2 p-2 font-medium marker:content-none hover:cursor-pointer">
                      <span className="flex gap-2">
                        <img
                          className="w-6 h-6 rounded-full"
                          src={user.user_metadata.avatar_url}
                          alt="avatar photo"
                        />

                        <span className="text-gray-800">
                          {user.user_metadata.full_name}
                        </span>
                      </span>
                      <svg
                        className="w-5 h-5 text-gray-800 transition group-open:rotate-90"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                        ></path>
                      </svg>
                    </summary>

                    <article className="px-4 pb-4">
                      <ul className="flex flex-col gap-4 pl-2 mt-4">
                        <li className="flex gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                            ></path>
                          </svg>

                          {watches && (
                            <span className="text-gray-800">
                              Total watches: {watches.length}
                            </span>
                          )}
                        </li>

                        <form action="/auth/signout" method="post">
                          <button
                            type="submit"
                            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
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
        <WatchForm />
        <div className="mt-6">
          {watches && watches.length > 0 ? (
            watches.map((watch) => (
              <div
                key={watch.id}
                className="flex justify-between items-center gap-[20px] md:gap-[30px] flex-col md:flex-row mb-4 p-4 bg-[var(--custom-color-secondary)] shadow"
              >
                <h2 className="text-xl text-white mb-2">
                  {watch.brand} - {watch.model}
                </h2>
                <div className="flex space-x-2">
                  <form action={deleteWatch}>
                    <input type="hidden" name="id" value={watch.id} />
                    <button
                      type="submit"
                      className="flex justify-between items-center gap-2 bg-[var(--custom-color-red)] hover:bg-red-700 text-white font-bold py-2 px-4 rounded-[30px]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                      Delete
                    </button>
                  </form>
                  <EditWatch watch={watch} />
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center md:gap-[10px] flex-col md:flex-row mb-4 p-4 bg-[var(--custom-color-secondary)] rounded-lg shadow ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </svg>
              Zero Items found!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
