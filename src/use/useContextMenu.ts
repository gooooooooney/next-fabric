import { fabric } from "@/lib/fabric"
import { useState, useEffect } from "react"
import { CANVAS_EVENT_SELECTED, Canvas_Event_Object } from "../constants/enum"
import { emitter } from "../core/event"
import { useCanvasState } from "../store/canvas"
import { useCanvasContext } from "./useCanvasStore"
import { useMount } from "./useMount"

export const useContextMenu = () => {
  const state = useCanvasContext()

  const [shouldShowContextMenu, setShouldShowContextMenu] = useState(false)
  const [contextPosition, setContextPosition] = useState({ x: 0, y: 0 })
  useEffect(() => {
    emitter.on(CANVAS_EVENT_SELECTED.NONE, () => {
      setShouldShowContextMenu(false)
    })
    state.canvas?.on("contextmenu", (opt) => {
      // 如果有选中的元素，就显示右键菜单
      
      const hasActiveEle = state.canvas?.getActiveObjects() && state.canvas?.getActiveObjects().length > 0
      if (opt.target && hasActiveEle) {
        setShouldShowContextMenu(true)
        const pointer = opt.e as PointerEvent
        setContextPosition({
          x: pointer.clientX,
          y: pointer.clientY,
        })
      }
    })
  }, [state.canvas])
  return { shouldShowContextMenu, setShouldShowContextMenu, contextPosition }
}