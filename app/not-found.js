import Link from "next/link";
import { MoveLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="text-9xl font-black text-on-track mb-4">404</h1>
      <h2 className="text-3xl font-black text-gray-900 mb-6">Page Not Found.</h2>
      
      <p className="text-gray-500 max-w-md mb-10 text-lg font-medium leading-relaxed">
        Looks like this link is broken. The page you&apos;re looking for doesn&apos;t exist or has been removed.
      </p>
      
      <Link 
        href="/" 
        className="btn-primary flex items-center gap-3 px-8 group transition-all"
      >
        <MoveLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Go back home
      </Link>
    </div>
  );
}
