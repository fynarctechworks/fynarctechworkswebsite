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
        title={about.founder.role}
        handle="fyn_arc_"
        status="Founder & CEO"
        contactText="Contact"
        avatarUrl="/founder-avatar.png"
        showUserInfo
        enableTilt
        enableMobileTilt={false}
        onContactClick={() => {
          window.location.href = "/contact";
        }}
      />
    </div>
  );
}
