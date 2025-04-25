import { Button } from "@/app/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex flex-col gap-8">
        <h1 className="text-4xl font-bold">Welcome to Client Dashboard</h1>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/dashboard">Client Dashboard</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin">Admin Portal</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
