import { fabric } from "@/lib/fabric"
import { useState, useEffect } from "react"
import { CANVAS_EVENT_SELECTED, Canvas_Event_Object } from "../constants/enum"
import { emitter } from "../core/event"
import { useCanvasState } from "../store/canvas"
import { useCanvasContext } from "./useCanvasStore"

export const useContextMenu = () => {
  const state = useCanvasContext()

  const [shouldShowContextMenu, setShouldShowContextMenu] = useState(false)
  const [contextPosition, setContextPosition] = useState({ left: 0, top: 0 })
  useEffect(() => {
    emitter.on(CANVAS_EVENT_SELECTED.NONE, () => {
      setShouldShowContextMenu(false)
    })

    emitter.on(Canvas_Event_Object.CONTEXT_MENU, (opt: fabric.TPointerEventInfo<fabric.TPointerEvent>) => {
      // 如果有选中的元素，就显示右键菜单
      const hasActiveEle = state.activeElements && state.activeElements.length > 0
      if (opt.target && hasActiveEle) {
        setShouldShowContextMenu(true)
        setContextPosition({
          left: opt.pointer.x,
          top: opt.pointer.y
        })
      }
    })
  }, [])
  return { shouldShowContextMenu, contextPosition }
}