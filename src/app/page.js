import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="relative bg-heroBg bg-cover bg-center min-h-screen flex items-center justify-center">
        <div className="z-10 text-center relative">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Welcome to CohesionHub
          </h1>
          <p className="text-lg md:text-xl text-white mb-8">
            The Ultimate Team-Building Experience
          </p>
          <Link
            href="/games"
            className="bg-blue-500 shadow-md hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition duration-300"
          >
            Get Started
          </Link>
        </div>
      </div>
    </main>
  );
}
