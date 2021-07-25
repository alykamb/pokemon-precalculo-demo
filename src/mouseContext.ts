import { createContext } from "react";

export interface MouseContext {
    x: number;
    y: number;
}

export const MouseContext = createContext<MouseContext>({
    x: 0,
    y: 0,
})