import { ConvexReactClient } from "convex/react";
import { ConvexProvider } from "convex/react";

const convexUrl = import.meta.env.VITE_CONVEX_URL as string;
if (!convexUrl) {
  throw new Error("VITE_CONVEX_URL is not set in environment");
}

export const convex = new ConvexReactClient(convexUrl);
export { ConvexProvider };
