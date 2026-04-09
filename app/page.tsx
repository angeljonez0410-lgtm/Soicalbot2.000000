import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow p-8 max-w-xl w-full">
        <h1 className="text-3xl font-bold text-gray-900">ResumeVault Social Bot</h1>
        <p className="text-gray-600 mt-2">Deployment is live.</p>

        <div className="mt-6">
          <Link
            href="/admin/login"
            className="inline-block bg-indigo-600 text-white px-5 py-3 rounded-xl font-semibold"
          >
            Go to Admin Login
          </Link>
        </div>
      </div>
    </main>
  );
}
