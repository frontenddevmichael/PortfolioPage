import { createContext, useContext } from "react";

export const ScrollContext = createContext({ progress: 0, scrollY: 0 });

export function useScroll() {
  return useContext(ScrollContext);
}
