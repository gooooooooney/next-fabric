import { useEffect } from "react";
import { useAttrState } from "../store/attrState";

export function useAttrCtx() {
  const state = useAttrState()
  useEffect(() => {
    if (state.shouldShowColor) {
      state.updateAttrState({ shouldShowImage: false, shouldShowShape: false, shouldShowTemplate: false, shouldShowText: false })
    }
    if (state.shouldShowImage) {
      state.updateAttrState({ shouldShowColor: false, shouldShowShape: false, shouldShowTemplate: false, shouldShowText: false })
    }
    if (state.shouldShowShape) {
      state.updateAttrState({ shouldShowColor: false, shouldShowImage: false, shouldShowTemplate: false, shouldShowText: false })
    }
    if (state.shouldShowTemplate) {
      state.updateAttrState({ shouldShowColor: false, shouldShowImage: false, shouldShowShape: false, shouldShowText: false })
    }

  }, [state, state.shouldShowColor, state.shouldShowImage, state.shouldShowShape, state.shouldShowTemplate, state.shouldShowText])
  return state
}