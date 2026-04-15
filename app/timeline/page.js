"use client";

import Image from "next/image";
import { useTimeline } from "@/hooks/useTimeline";
import { 
  Filter,
  ChevronDown,
  History
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function TimelinePage() {
  const { timeline, loading } = useTimeline();
  const [filter, setFilter] = useState('all');

  const filteredTimeline = timeline.filter(entry => 
    filter === 'all' ? true : entry.type === filter
  );

  const getIcon = (type) => {
    switch (type) {
      case 'call': return <Image src="/Keen-Keeper/assets/call.png" alt="Call" width={28} height={28} className="object-contain" />;
      case 'text': return <Image src="/Keen-Keeper/assets/text.png" alt="Text" width={28} height={28} className="object-contain" />;
      case 'video': return <Image src="/Keen-Keeper/assets/video.png" alt="Video" width={28} height={28} className="object-contain" />;
      default: return <History className="w-5 h-5 text-gray-400" />;
    }
  };

  const getIconBg = (type) => {
    return "bg-gray-50/50 border-gray-100/50";
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 sm:py-12">
      <div className="mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-8">Timeline</h1>
        
        <div className="relative group max-w-sm">
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full appearance-none bg-white border-2 border-gray-100 px-6 py-4 pr-12 rounded-2xl text-sm font-bold text-gray-700 focus:outline-none focus:ring-4 focus:ring-primary-dark/10 transition-all cursor-pointer shadow-sm hover:border-gray-200"
          >
            <option value="all">Filter timeline</option>
            <option value="call">📞 Calls Only</option>
            <option value="text">💬 Texts Only</option>
            <option value="video">🎥 Videos Only</option>
          </select>
          <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none group-hover:text-gray-600 transition-colors" />
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-gray-100 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : filteredTimeline.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
             <Filter className="w-8 h-8 text-gray-300" />
          </div>
          <p className="text-gray-400 font-medium">No interactions found. Start a check-in from a friend&apos;s profile!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTimeline.map((entry) => (
            <div 
              key={entry.id}
              className="group bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center gap-6"
            >
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center border transition-colors",
                getIconBg(entry.type)
              )}>
                {getIcon(entry.type)}
              </div>
              
              <div className="flex-grow">
                <h3 className="font-bold text-gray-900 group-hover:text-primary-dark transition-colors">
                  {entry.title}
                </h3>
                <p className="text-xs text-gray-400 font-medium mt-0.5">
                  {entry.date}
                </p>
              </div>

              <div className="hidden sm:block">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">Logged</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
