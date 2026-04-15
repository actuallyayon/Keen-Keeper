import friendsData from "@/data/friends.json";
import FriendDetailClient from "./FriendDetailClient";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return friendsData.map((friend) => ({
    id: friend.id.toString(),
  }));
}

export default async function Page({ params }) {
  const { id } = await params;
  const friendId = parseInt(id);
  const friend = friendsData.find((f) => f.id === friendId);

  if (!friend) {
    notFound();
  }

  return <FriendDetailClient friend={friend} />;
}
