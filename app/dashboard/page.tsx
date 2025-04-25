import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link 
          href="/"
          className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
        >
          Back to Home
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card text-card-foreground rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Total Clients</h2>
          <p className="text-4xl font-bold">24</p>
        </div>
        <div className="bg-card text-card-foreground rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Active Projects</h2>
          <p className="text-4xl font-bold">12</p>
        </div>
        <div className="bg-card text-card-foreground rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Pending Tasks</h2>
          <p className="text-4xl font-bold">8</p>
        </div>
      </div>
      
      <div className="bg-card text-card-foreground rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="border-b pb-4 last:border-0">
              <p className="font-medium">Client #{item} updated their profile</p>
              <p className="text-sm text-muted-foreground">2 hours ago</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-card text-card-foreground rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Upcoming Deadlines</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="border-b pb-4 last:border-0">
              <p className="font-medium">Project #{item} Milestone Due</p>
              <p className="text-sm text-muted-foreground">In 3 days</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
