"use client"

import z from "zod";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";

import { Loader } from "@/components/loader";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { AuthHeader } from "./auth-header";
import { GoogleIcon } from "../icons/google-icon";

import { authClient } from "@/lib/auth-client";

export default function SignInForm() {
  const router = useRouter();
  const { isPending } = authClient.useSession();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      await authClient.signIn.email(
        {
          email: value.email,
          password: value.password,
        },
        {
          onSuccess: (ctx) => {
            // TODO: Remove this, just for development
            const authToken = ctx.response.headers.get("set-auth-token")
            localStorage.setItem("bearer_token", authToken!);

            router.push("/dashboard");
            toast.success("Sign in successful");
          },
          onError: (error) => {
            toast.error(error.error.message || error.error.statusText);
          },
        },
      );
    },
    validators: {
      onSubmit: z.object({
        email: z.email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
      }),
    },
  });

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="w-full max-w-90 lg:max-w-md mx-auto mt-10 p-8 lg:p-12 border border-neutral-800 rounded-2xl bg-neutral-900">
      {/* Header */}
      <header className="mb-6 text-center space-y-2">
        <Link href="/">
          <AuthHeader />
        </Link>
        <div className="pb-2 space-y-2">
          <h1 className="text-xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground text-sm">
            Please enter your details to sign in
          </p>
        </div>
      </header>

      {/* Auth Providers */}
      <nav className="flex flex-col gap-2">
        <Button variant="outline" className="w-full mb-4 rounded-xl h-11" onClick={() => router.push("/auth/google")}>
          <span className="mr-1">
            <GoogleIcon />
          </span>
          Sign in with Google
        </Button>
      </nav>

      <span className="block text-center text-xs text-muted-foreground py-4">
        OR
      </span>

      {/* Email and Password */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        <div>
          <form.Field name="email">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Email</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  className="rounded-md h-10"
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors.map((error) => (
                  <p key={error?.message} className="text-red-500">
                    {error?.message}
                  </p>
                ))}
              </div>
            )}
          </form.Field>
        </div>

        <div>
          <form.Field name="password">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Password</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="password"
                  className="rounded-md h-10"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors.map((error) => (
                  <p key={error?.message} className="text-red-500">
                    {error?.message}
                  </p>
                ))}
              </div>
            )}
          </form.Field>
        </div>

        {/* Submit */}
        <form.Subscribe>
          {(state) => (
            <Button
              type="submit"
              className="w-full rounded-lg h-10 bg-green-500 hover:bg-green-600 disabled:bg-green-300 disabled:cursor-not-allowed mt-2 text-sm font-medium"
              disabled={!state.canSubmit || state.isSubmitting}
            >
              {state.isSubmitting ? "Submitting..." : "Sign In"}
            </Button>
          )}
        </form.Subscribe>
      </form>

      {/* Footer */}
      <nav className="mt-4 text-center">
        <Link
          href="/sign-up"
          className="text-muted-foreground text-sm"
        >
          Need an account?
          <span className="text-primary ml-1 font-medium hover:underline">
            Sign Up
          </span>
        </Link>
      </nav>
    </div>
  );
}
