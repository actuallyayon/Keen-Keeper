"use client";

import Image from "next/image";
import Link from "next/link";
import { useTimeline } from "@/hooks/useTimeline";
import { 
  Bell, 
  Archive, 
  Trash2, 
  ChevronLeft,
  Target
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function FriendDetailClient({ friend }) {
  const { addInteraction } = useTimeline();

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "on-track": return "bg-on-track";
      case "almost due": return "bg-almost-due";
      case "overdue": return "bg-overdue";
      default: return "bg-gray-400";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-primary-dark mb-8 group">
        <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
        Back to Friends
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Profile info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col items-center text-center">
            <div className="relative w-32 h-32 mb-6">
              <Image
                src={friend.picture}
                alt={friend.name}
                fill
                className="rounded-full object-cover border-4 border-gray-50 shadow-sm"
              />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{friend.name}</h1>
            
            <div className="flex flex-col gap-2 mb-6">
               <span className={cn(
                "tag text-white px-4 py-1 rounded-full text-[10px]",
                getStatusColor(friend.status)
              )}>
                {friend.status.toUpperCase()}
              </span>
              <div className="flex flex-wrap justify-center gap-2">
                {friend.tags.map(tag => (
                  <span key={tag} className="tag bg-on-track/10 text-on-track px-3">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-gray-500 italic text-sm mb-6 leading-relaxed">
              &ldquo;{friend.bio}&rdquo;
            </p>
            
            <div className="w-full pt-6 border-t border-gray-50">
              <span className="text-xs text-gray-400 block mb-1">Preferred: email</span>
              <p className="text-sm font-medium text-gray-700">{friend.email}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-700 py-3.5 rounded-xl border border-gray-100 transition-colors shadow-sm text-sm font-semibold">
              <Bell className="w-4 h-4" />
              Snooze 2 Weeks
            </button>
            <button className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-700 py-3.5 rounded-xl border border-gray-100 transition-colors shadow-sm text-sm font-semibold">
              <Archive className="w-4 h-4" />
              Archive
            </button>
            <button className="w-full flex items-center justify-center gap-3 bg-white hover:bg-red-50 text-red-500 py-3.5 rounded-xl border border-red-50 transition-colors shadow-sm text-sm font-semibold">
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>

        {/* Right Column - Stats and Actions */}
        <div className="lg:col-span-8 space-y-8">
          {/* Stats Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center">
              <span className="text-4xl font-bold text-primary-dark block mb-2">{friend.days_since_contact}</span>
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Days Since Contact</span>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center">
              <span className="text-4xl font-bold text-primary-dark block mb-2">{friend.goal}</span>
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Goal (Days)</span>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center">
              <span className="text-2xl font-bold text-primary-dark block mb-2 mt-2">
                {new Date(friend.next_due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Next Due</span>
            </div>
          </div>

          {/* Relationship Goal */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-primary-dark">Relationship Goal</h3>
              <button className="px-5 py-2 bg-white hover:bg-gray-50 rounded-xl border border-gray-100 text-xs font-bold text-gray-700 shadow-sm transition-all active:scale-95">
                Edit
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-on-track/10 rounded-2xl flex items-center justify-center">
                <Target className="w-6 h-6 text-on-track" />
              </div>
              <p className="text-gray-600">
                Connect every <span className="font-extrabold text-gray-900">{friend.goal} days</span>
              </p>
            </div>
          </div>

          {/* Quick Check-In */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-8">Quick Check-In</h3>
            <div className="grid grid-cols-3 gap-6">
              <button 
                onClick={() => addInteraction(friend.id, friend.name, 'call')}
                className="flex flex-col items-center gap-4 p-8 rounded-3xl bg-gray-50/50 hover:bg-primary-dark hover:text-white transition-all duration-300 group shadow-sm hover:shadow-lg"
              >
                <Image src="/Keen-Keeper/assets/PhoneCall.png" alt="Call" width={32} height={32} className="transition-all duration-300 group-hover:brightness-0 group-hover:invert" />
                <span className="text-sm font-bold">Call</span>
              </button>
              
              <button 
                onClick={() => addInteraction(friend.id, friend.name, 'text')}
                className="flex flex-col items-center gap-4 p-8 rounded-3xl bg-gray-50/50 hover:bg-primary-dark hover:text-white transition-all duration-300 group shadow-sm hover:shadow-lg"
              >
                <Image src="/Keen-Keeper/assets/ChatDots.png" alt="Text" width={32} height={32} className="transition-all duration-300 group-hover:brightness-0 group-hover:invert" />
                <span className="text-sm font-bold">Text</span>
              </button>
              
              <button 
                onClick={() => addInteraction(friend.id, friend.name, 'video')}
                className="flex flex-col items-center gap-4 p-8 rounded-3xl bg-gray-50/50 hover:bg-primary-dark hover:text-white transition-all duration-300 group shadow-sm hover:shadow-lg"
              >
                <Image src="/Keen-Keeper/assets/VideoCamera.png" alt="Video" width={32} height={32} className="transition-all duration-300 group-hover:brightness-0 group-hover:invert" />
                <span className="text-sm font-bold">Video</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
