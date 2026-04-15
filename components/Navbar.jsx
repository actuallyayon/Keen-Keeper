"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NavLinks = [
  { name: "Home", href: "/", icon: "/Keen-Keeper/assets/home.png" },
  { name: "Timeline", href: "/timeline", icon: "/Keen-Keeper/assets/timeline.png" },
  { name: "Stats", href: "/stats", icon: "/Keen-Keeper/assets/stats.png" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <nav className={cn(
      "sticky top-0 z-[1000] border-b border-gray-100 transition-all duration-300",
      isOpen ? "bg-white" : "bg-white/80 backdrop-blur-md"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/Keen-Keeper/assets/logo.png"
              alt="KeenKeeper Logo"
              width={150}
              height={40}
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {NavLinks.map((link) => {
              const isActive = link.href === "/" 
                ? (pathname === "/" || pathname.startsWith("/friend/"))
                : pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2 px-5 py-2.5 text-sm font-bold transition-all duration-300 rounded-xl group relative",
                    isActive
                      ? "bg-primary-dark text-white shadow-lg shadow-primary-dark/20"
                      : "text-gray-500 hover:bg-gray-100 hover:text-primary-dark active:scale-95"
                  )}
                >
                  <Image
                    src={link.icon}
                    alt=""
                    width={18}
                    height={18}
                    className={cn(
                      "transition-all duration-300",
                      isActive ? "opacity-100 brightness-0 invert" : "opacity-40 group-hover:opacity-100 group-hover:brightness-0 group-hover:invert-0"
                    )}
                  />
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 z-[9999] md:hidden bg-white px-6 pt-12 flex flex-col items-center transition-all duration-500 ease-in-out transform",
        isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      )}>
        <div className="flex flex-col gap-3 text-center w-full items-center">
           <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-full bg-gray-50 text-gray-400 hover:text-primary-dark shadow-sm transition-transform hover:rotate-90"
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className={cn(
            "mb-6 transition-all duration-500 delay-100",
            isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}>
             <Image
              src="/Keen-Keeper/assets/logo.png"
              alt="KeenKeeper Logo"
              width={110}
              height={34}
              className="mx-auto h-auto w-[110px]"
            />
          </div>
          
          <div className="flex flex-col gap-1.5 w-full items-center">
            {NavLinks.map((link, index) => {
              const isActive = link.href === "/" 
                ? (pathname === "/" || pathname.startsWith("/friend/"))
                : pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  style={{ transitionDelay: isOpen ? `${(index + 2) * 100}ms` : '0ms' }}
                  className={cn(
                    "flex items-center justify-center gap-3 text-base font-bold py-2.5 px-6 rounded-xl transition-all duration-500 w-fit min-w-[140px]",
                    isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
                    isActive 
                      ? "bg-primary-dark/5 text-primary-dark" 
                      : "text-gray-400 hover:text-primary-dark active:scale-95 hover:bg-gray-50"
                  )}
                >
                  <Image
                    src={link.icon}
                    alt=""
                    width={16}
                    height={16}
                    className={cn(
                      "transition-all duration-300",
                      isActive ? "opacity-100 brightness-0 invert-0" : "opacity-40"
                    )}
                  />
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
