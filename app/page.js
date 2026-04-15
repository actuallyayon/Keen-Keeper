"use client";

import { useState, useEffect } from "react";
import friendsData from "@/data/friends.json";
import FriendCard from "@/components/FriendCard";
import { Plus } from "lucide-react";
import Loading from "./loading";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a fetching delay to show the loading animation (Requirement 10.2)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { label: "Total Friends", value: friendsData.length },
    { label: "On Track", value: friendsData.filter(f => f.status === "on-track").length },
    { label: "Need Attention", value: friendsData.filter(f => f.status !== "on-track").length },
    { label: "Interactions This Month", value: 12 },
  ];

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="pb-20">
      {/* Hero Banner */}
      <section className="pt-20 pb-16 text-center">
        <h1 className="text-5xl font-extrabold text-[#111827] mb-4">
          Friends to keep close in your life
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed text-sm">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>
        
        <button className="btn-primary mx-auto group">
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          Add a Friend
        </button>
      </section>

      {/* Stats Summary */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div 
              key={i}
              className="bg-white p-8 rounded-2xl border border-gray-100 flex flex-col items-center justify-center text-center shadow-sm"
            >
              <span className="text-3xl font-bold text-primary-dark mb-1">{stat.value}</span>
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Friends Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-10">Your Friends</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {friendsData.map((friend) => (
            <FriendCard key={friend.id} friend={friend} />
          ))}
        </div>
      </div>
    </div>
  );
}
