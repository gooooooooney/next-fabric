import { CanvasContext } from "@/components/context/store";
import { useContext } from "react";

export const useCanvasContext = () => useContext(CanvasContext);