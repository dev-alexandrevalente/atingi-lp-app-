import { Transition } from "framer-motion";

export type MockupScene = "SCENE_1_LOCKSCREEN" | "SCENE_2_NOTIFICATIONS" | "SCENE_3_DASHBOARD";

export const springSlow: Transition = { type: "spring", stiffness: 45, damping: 20 };
export const springMedium: Transition = { type: "spring", stiffness: 80, damping: 15 };
export const springBouncy: Transition = { type: "spring", stiffness: 120, damping: 12 };
export const springFast: Transition = { type: "spring", stiffness: 150, damping: 14 };

export interface SceneProps {
  currentScene: MockupScene;
}
