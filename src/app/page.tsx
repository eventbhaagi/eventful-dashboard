import AppSidebar from "@/app/components/sidebar/AppSidebar";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <AppSidebar />
      </div>
      
      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to Eventful India
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Your one-stop solution for all event management needs.
          </p>
          
          
        </div>
      </main>
    </div>
  );
}