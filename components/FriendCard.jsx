import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function FriendCard({ friend }) {
  const getStatusStyles = (status) => {
    switch (status.toLowerCase()) {
      case "on-track":
        return "bg-on-track text-white";
      case "almost due":
        return "bg-almost-due text-white";
      case "overdue":
        return "bg-overdue text-white";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  return (
    <Link
      href={`/friend/${friend.id}`}
      className="group bg-white rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-transparent hover:border-gray-100 flex flex-col items-center text-center"
    >
      <div className="relative w-20 h-20 mb-4">
        <Image
          src={friend.picture}
          alt={friend.name}
          fill
          className="rounded-full object-cover border-4 border-gray-50 bg-gray-100"
        />
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary-dark transition-colors">
        {friend.name}
      </h3>
      
      <p className="text-sm text-gray-400 mb-4">
        {friend.days_since_contact}d ago
      </p>
      
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {friend.tags.map((tag) => (
          <span
            key={tag}
            className="tag bg-on-track/10 text-on-track"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <div className={cn(
        "tag py-1 px-4 rounded-full",
        getStatusStyles(friend.status)
      )}>
        {friend.status.toUpperCase()}
      </div>
    </Link>
  );
}
