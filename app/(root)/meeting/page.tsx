"use client";

import React, { useEffect, useRef, Suspense } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSearchParams } from "next/navigation";

function MeetingContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!id || !containerRef.current) return;

    const myMeeting = async () => {
      const appID = Number(process.env.NEXT_PUBLIC_ZEGO_APP_ID);
      const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET || "";
      
      if (!appID || !serverSecret) {
        console.error("ZegoCloud credentials are missing. Please check your .env file.");
        return;
      }

      // Generate Kit Token
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        id,
        Date.now().toString(),
        "Guest"
      );

      // Create instance object from Kit Token.
      const zp = ZegoUIKitPrebuilt.create(kitToken);

      // start the call
      zp.joinRoom({
        container: containerRef.current,
        sharedLinks: [
          {
            name: "Meeting link",
            url: window.location.origin + window.location.pathname + "?id=" + id,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference,
        },
        showMyCameraToggleButton: true,
        showMyMicrophoneToggleButton: true,
        showAudioVideoSettingsButton: true,
        showScreenSharingButton: true,
      });
    };

    myMeeting();
  }, [id]);

  if (!id) {
    return (
      <div className="p-8 bg-white dark:bg-zinc-900 rounded-3xl text-center max-w-md shadow-2xl">
        <h1 className="text-2xl font-black mb-4 uppercase tracking-tighter">Invalid Meeting</h1>
        <p className="text-zinc-500 dark:text-zinc-400 font-medium">No meeting ID found in the URL.</p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full"
    />
  );
}

export default function MeetingPage() {
  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center">
      {!process.env.NEXT_PUBLIC_ZEGO_APP_ID && (
        <div className="p-8 bg-white dark:bg-zinc-900 rounded-3xl text-center max-w-md shadow-2xl z-50">
          <h1 className="text-2xl font-black mb-4 uppercase tracking-tighter">ZegoCloud Setup Required</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mb-6 font-medium">
            Please add your ZegoCloud <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">NEXT_PUBLIC_ZEGO_APP_ID</code> and <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">NEXT_PUBLIC_ZEGO_SERVER_SECRET</code> to your .env file to enable video calls.
          </p>
        </div>
      )}
      <Suspense fallback={<div className="text-white">Loading meeting room...</div>}>
        <MeetingContent />
      </Suspense>
    </div>
  );
}
