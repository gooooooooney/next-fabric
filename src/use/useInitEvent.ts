import { fabric } from "@/lib/fabric"
import { useEffect, useState } from "react"
import { CANVAS_EVENT_SELECTED, Canvas_Event_Object } from "../constants/enum"
import { emitter } from "../core/event"
import { useCanvasState } from "../store/canvas"
import { useCanvasContext } from "./useCanvasStore"

export const useCanvasSelectedInitEvent = () => {
  const state = useCanvasContext()
  useEffect(() => {
    // 当emitter执行的时候 state.blocks还没有更新
    emitter.on(CANVAS_EVENT_SELECTED.ONE, (baseObj) => {
      if (baseObj) {
        state.setActiveElements([baseObj])
        const block = state.blocks.find(block => block.id == baseObj?.get('id'))
        if (block) {
          state.setCurrentBlock([block])
        }
      }
    })
    emitter.on(CANVAS_EVENT_SELECTED.MULTIPLY, (actives) => {
      if (actives) {
        state.setActiveElements(actives)
        // 找出当前选中的所有block
        const _blocks = actives.map(active => {
          return state.blocks.find(block => block.id == active?.get('id'))!
        })
        state.setCurrentBlock(_blocks)
      }

    })
    // 没有选中元素 重置currentBlock 和 activeElements
    emitter.on(CANVAS_EVENT_SELECTED.NONE, () => {
      state.setActiveElements([])
      state.setCurrentBlock([])
    })
  }, [state, state.activeElements, state.blocks])
}


