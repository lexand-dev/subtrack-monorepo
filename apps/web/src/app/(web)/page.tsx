import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Space_Grotesk } from "next/font/google";

import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-2">
      <header className="flex flex-col items-center justify-center pt-24  px-auto text-center gap-y-8">
        <h2 className={cn("text-wrap text-6xl max-w-6xl font-bold", spaceGrotesk.className)}>
          Stop paying for
          forgotten subscriptions
        </h2>
        <p className="text-wrap max-w-lg text-lg text-muted-foreground">
          Track every penny, manage recurring bills, and save money effortlessly with the most intuitive subscription manager
        </p>
        <div className="text-center">
          <Link href="/sign-up">
            <Button
              className="px-8 py-6 text-sm bg-primary hover:bg-primary/80 text-black text-md shadow-lg shadow-primary/20 focus:ring-4 focus:ring-primary/50 focus:outline-none"
            >
              Start Tracking Free
              <span>
                <ArrowRight />
              </span>
            </Button>
          </Link>
        </div>
      </header>

      <div className="grid gap-6 py-8 pt-24">
        <section className="rounded-lg border p-4">
          <h2 className="mb-2 font-medium">API Status</h2>
        </section>
      </div>
    </div>
  );
}
