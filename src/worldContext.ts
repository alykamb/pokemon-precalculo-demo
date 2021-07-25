import { createContext } from "react";

export interface WorldContext {
    width: number;
    height: number;
    depth: number;
}

export const WorldContext = createContext<WorldContext>({
    width: 800,
    height: 800,
    depth: 200
})