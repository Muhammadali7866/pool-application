"use client";
import { supabase } from "@/src/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";
interface AuthFormProps {
  type: "signin" | "signup";
}

export default function AuthForm({ type }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const isSignIn = type === "signin";
  const router = useRouter();
  const handleRedirect = () => {
    router.push(isSignIn ? "/signup" : "signin");
  };

  const handleSignUp = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    try {
      if (isSignIn) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) {
          alert(error.message);
          return;
        }

        router.push("/dashboard");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) {
          alert(error.message);
          return;
        }
        alert("Sign-up successful. Please check your email to confirm.");
        router.push("/signin"); // or wait until confirmed
      }
    } catch (error) {
      console.error("Auth error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      action=""
      className="p-8 rounded shadow-2xl w-full max-w-4xl h-[550px]  justify-center items-center"
      onSubmit={handleSignUp}
    >
      <h1 className="text-2xl font-semibold mb-4 text-white text-center">
        {isSignIn ? "Welcome back" : "Create an Account"}
      </h1>
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-white text-base font-medium leading-normal pb-2">
            Email
          </p>
          <input
            placeholder="your@email.com"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#223649] focus:border-none h-14 placeholder:text-[#90aecb] p-4 text-base font-normal leading-normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-white text-base font-medium leading-normal pb-2">
            Password
          </p>
          <input
            placeholder="Enter your password"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#223649] focus:border-none h-14 placeholder:text-[#90aecb] p-4 text-base font-normal leading-normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <div className="flex px-4 py-3">
        <button
          className={`flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 flex-1 text-white text-sm font-bold leading-normal tracking-[0.015em] ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#0b80ee]"
          }`}
          disabled={loading}
        >
          <span className="truncate"> {isSignIn ? "Login" : "Sign Up"}</span>
        </button>
      </div>
      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleRedirect}
          className="text-sm text-blue-300 hover:text-white hover:underline font-medium transition duration-200 mt-3"
        >
          {isSignIn ? "Don’t have an account?" : "I already have an account"}
        </button>
      </div>
    </form>
  );
}
