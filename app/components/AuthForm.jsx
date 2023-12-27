"use client";

import { Auth } from "@supabase/auth-ui-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  // Import predefined theme
  ThemeSupa,
} from "@supabase/auth-ui-shared";

export default function AuthForm() {
  const supabase = createClientComponentClient();

  const customTheme = {
    default: {
      colors: {
        brand: "hsl(153 60.0% 53.0%)",
        brandAccent: "hsl(154 54.8% 45.1%)",
        brandButtonText: "white",
        // ..
      },
    },
    dark: {
      colors: {
        brandButtonText: "white",
        defaultButtonBackground: "#2e2e2e",
        defaultButtonBackgroundHover: "#3e3e3e",
        //..
      },
    },
    // You can also add more theme variations with different names.
    evenDarker: {
      colors: {
        brandButtonText: "white",
        defaultButtonBackground: "#1e1e1e",
        defaultButtonBackgroundHover: "#2e2e2e",
        //..
      },
    },
  };

  return (
    <>
      <Auth
        supabaseClient={supabase}
        view="magic_link"
        showLinks={false}
        providers={["google", "github"]}
        redirectTo="http://localhost:3000/auth/callback"
        appearance={{ theme: ThemeSupa }}
      />
    </>
  );
}
