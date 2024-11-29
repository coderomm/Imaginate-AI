/* eslint-disable @next/next/no-img-element */
// import Image from "next/image";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function UserImage({ image }: any) {
  return (
    <div>
      <img
        className="w-full h-full rounded-full cursor-pointer"
        src={image || ""}
        width={100}
        height={100}
        alt="user_profile_image"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}