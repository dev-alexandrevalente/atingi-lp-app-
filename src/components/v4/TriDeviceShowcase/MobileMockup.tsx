import React, { useEffect, useState } from "react";
import { MockupScene } from "./variants";
import Scene1Lockscreen from "./Scene1Lockscreen";
import Scene2Notifications from "./Scene2Notifications";
import Scene3Dashboard from "./Scene3Dashboard";

export default function MobileMockup() {
  const [currentScene, setCurrentScene] = useState<MockupScene>("SCENE_1_LOCKSCREEN");

  // Timeline Orchestration for the Single Phone
  useEffect(() => {
    // Basic auto-cycling timeline
    const loop = async () => {
       setCurrentScene("SCENE_1_LOCKSCREEN");
       await new Promise(r => setTimeout(r, 4000));
       setCurrentScene("SCENE_2_NOTIFICATIONS");
       await new Promise(r => setTimeout(r, 4000));
       setCurrentScene("SCENE_3_DASHBOARD");
       await new Promise(r => setTimeout(r, 5000));
       // Loop back
       setCurrentScene("SCENE_1_LOCKSCREEN");
    };

    let mounted = true;
    const run = async () => {
      while(mounted) {
        await loop();
      }
    };
    run();

    return () => { mounted = false; };
  }, []);

  return (
    <div className="relative w-full h-full bg-[#f8fafc] rounded-[36px] shadow-[0_20px_40px_rgba(0,0,0,0.1),_inset_0_0_0_8px_#ffffff,_inset_0_0_0_10px_#e2e8f0] overflow-hidden border border-slate-200">
      {/* Notch Area */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[24px] bg-white border-b border-l border-r border-slate-200 rounded-b-[16px] z-50 flex items-center justify-center gap-2">
          <div className="w-8 h-1 bg-slate-200 rounded-full"></div>
      </div>

      {/* Side physical buttons */}
      <div className="absolute -left-[6px] top-[80px] w-1.5 h-8 bg-slate-300 rounded-l-md"></div>
      <div className="absolute -left-[6px] top-[120px] w-1.5 h-12 bg-slate-300 rounded-l-md"></div>
      <div className="absolute -right-[6px] top-[100px] w-1.5 h-14 bg-slate-300 rounded-r-md"></div>

      {/* The Screen (where scenes happen) */}
      <div className="absolute inset-[10px] bg-white rounded-[26px] overflow-hidden">
         <Scene1Lockscreen currentScene={currentScene} />
         <Scene2Notifications currentScene={currentScene} />
         <Scene3Dashboard currentScene={currentScene} />
         
         {/* iOS Home Indicator */}
         <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[35%] h-[3px] bg-slate-300 rounded-full z-50"></div>
      </div>
    </div>
  );
}
