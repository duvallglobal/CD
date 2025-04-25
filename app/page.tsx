import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Client Dashboard</h1>
      <p className="text-xl mb-8">Welcome to your client dashboard</p>
      <div className="flex gap-4">
        <Button>Get Started</Button>
      </div>
    </main>
  );
}
