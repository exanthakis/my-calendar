"use client";

export default function Footer() {
  return (
    <>
      <div className="flex flex-col md:flex-row pt-[2rem] md:pt-[4rem] items-center justify-center gap-[2.2rem] md:gap-8 opacity-50">
        <div className="bg-[url('/next.svg')] bg-cover bg-no-repeat bg-center w-[100px] h-5"></div>
        <div className="bg-[url('/supabase-logo-wordmark--light.svg')] bg-cover w-[110px] bg-no-repeat bg-center h-5 backdrop-grayscale-0"></div>
        <div className="bg-[url('/vercel.svg')] bg-cover bg-no-repeat bg-center w-[100px] h-5"></div>
        <div className="bg-[url('/tailwind_css_logo.svg')] bg-cover bg-no-repeat bg-center w-[160px] h-5"></div>
      </div>
    </>
  );
}
