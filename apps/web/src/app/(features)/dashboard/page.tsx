import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { authClient } from "@/lib/auth-client";

export default async function DashboardPage() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
      throw: true,
    },
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  const { data: customerState } = await authClient.customer.state({
    fetchOptions: {
      headers: await headers(),
    },
  });

  return (
    <section className="flex h-screen items-center justify-center">
      // TODO: show sidebar with customer state
    </section>
  );
}
