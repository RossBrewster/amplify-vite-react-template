// src/pages/Dashboard.tsx
import { useAuthenticator } from "@aws-amplify/ui-react";
import { TodoList } from "../components/TodoList";
import { FourOMini } from "../components/FourOMini";

export default function Dashboard() {
  const { user, signOut } = useAuthenticator();

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation Header */}
      <nav className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-white text-xl font-bold">Dashboard</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-300">Welcome, {user?.signInDetails?.loginId}</span>
              <button
                onClick={signOut}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Todo List Section */}
          <div className="flex flex-col h-full">
            <div className="bg-gray-800 rounded-lg shadow-xl p-6 flex-1">
              <TodoList username={user?.signInDetails?.loginId ?? 'Anonymous'} />
            </div>
          </div>

          {/* 4o-mini Section */}
          <div className="flex flex-col h-full">
            <div className="bg-gray-800 rounded-lg shadow-xl p-6 flex-1">
              <FourOMini />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}