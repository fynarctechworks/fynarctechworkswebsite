"use client";

import dynamic from "next/dynamic";
import { about } from "@/lib/content";

// Client only (pointer events + device APIs). Static placeholder while it loads.
const ProfileCard = dynamic(() => import("./ProfileCard"), {
  ssr: false,
  loading: () => (
    <div className="mx-auto aspect-[0.718] w-full max-w-[360px] animate-pulse rounded-[30px] bg-white/5" />
  ),
});

export function FounderCard() {
  return (
    <div className="mx-auto w-full max-w-[360px]">
      <ProfileCard
        name={about.founder.name}
        title="Founder & CEO"
        handle="fyn_arc_"
        status="FYN ARC Techworks"
        contactText="Contact"
        avatarUrl="/founder-avatar.png"
        showUserInfo
        showDetails
        holoEnabled={false}
        avatarFull
        enableTilt
        enableMobileTilt={false}
        onContactClick={() => {
          window.location.href = "/contact";
        }}
      />
    </div>
  );
}
