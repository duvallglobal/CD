import Link from 'next/link';

export default function Profile() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Profile</h1>
        <Link 
          href="/"
          className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
        >
          Back to Home
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-card text-card-foreground rounded-lg shadow p-6 mb-6">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center mb-4">
                <span className="text-4xl">👤</span>
              </div>
              <h2 className="text-xl font-semibold">John Doe</h2>
              <p className="text-muted-foreground">Client Manager</p>
            </div>
          </div>
          
          <div className="bg-card text-card-foreground rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p>john.doe@example.com</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p>+1 (555) 123-4567</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p>New York, NY</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <div className="bg-card text-card-foreground rounded-lg shadow p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">First Name</label>
                  <input 
                    type="text" 
                    className="w-full mt-1 px-3 py-2 bg-background border border-input rounded-md"
                    defaultValue="John"
                    disabled
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Last Name</label>
                  <input 
                    type="text" 
                    className="w-full mt-1 px-3 py-2 bg-background border border-input rounded-md"
                    defaultValue="Doe"
                    disabled
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Email</label>
                <input 
                  type="email" 
                  className="w-full mt-1 px-3 py-2 bg-background border border-input rounded-md"
                  defaultValue="john.doe@example.com"
                  disabled
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Role</label>
                <input 
                  type="text" 
                  className="w-full mt-1 px-3 py-2 bg-background border border-input rounded-md"
                  defaultValue="Client Manager"
                  disabled
                />
              </div>
            </div>
          </div>
          
          <div className="bg-card text-card-foreground rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive email updates about your account</p>
                </div>
                <div className="h-6 w-11 bg-muted rounded-full relative">
                  <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-primary"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">SMS Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive text messages for important updates</p>
                </div>
                <div className="h-6 w-11 bg-muted rounded-full relative">
                  <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-background"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Marketing Communications</p>
                  <p className="text-sm text-muted-foreground">Receive news and promotional materials</p>
                </div>
                <div className="h-6 w-11 bg-muted rounded-full relative">
                  <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-background"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
