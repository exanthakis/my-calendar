"use client";

export default function Footer() {
  return (
    <>
      <div className="flex flex-col items-center justify-center opacity-50 pt-[2rem] pb-[1rem] md:pt-[4rem] gap-9 md:gap-5">
        <h2 className="text-white font-JosefinSans text-lg">
          Brought to you by
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-[2.2rem] md:gap-8 ">
          <a
            href="https://nextjs.org/"
            aria-label="NextJs Link"
            target="_blank"
          >
            <div className="bg-[url('/next.svg')] bg-cover bg-no-repeat bg-center w-[100px] h-5"></div>
          </a>
          <a
            href="https://tailwindcss.com/"
            aria-label="Tailwind Link"
            target="_blank"
          >
            <div className="bg-[url('/tailwind_css_logo.svg')] bg-cover bg-no-repeat bg-center w-[160px] h-5"></div>
          </a>
          <a
            href="https://supabase.com/"
            aria-label="Supabase Link"
            target="_blank"
          >
            <div className="bg-[url('/supabase-logo-wordmark--light.svg')] bg-cover w-[110px] bg-no-repeat bg-center h-5 backdrop-grayscale-0"></div>
          </a>
          <a
            href="https://vercel.com"
            aria-label="Vercel.com Link"
            target="_blank"
          >
            <div className="bg-[url('/vercel.svg')] bg-cover bg-no-repeat bg-center w-[100px] h-5"></div>
          </a>
          <a
            aria-label="Github Repository"
            href="https://github.com/exanthakis/my-calendar"
            target="_blank"
          >
            <div className="bg-[url('/github.svg')] bg-cover bg-no-repeat bg-center w-[70px] h-5"></div>
          </a>
        </div>
      </div>
    </>
  );
}
