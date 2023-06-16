import { fabric } from "@/lib/fabric";
import { create } from 'zustand'
import { BlockInfo } from "../element/metadata";
import { immer } from 'zustand/middleware/immer'

export interface CanvasStore {
  canvas: fabric.Canvas | undefined,
  blocks: BlockInfo['canvasStyle'][];
  canvasStyleData: CanvasStyleData,
  currentBlock: BlockInfo[],
  activeElements: fabric.Object[]
  // updateCurrentBlock: QRL<(this: GlobalState, block: BlockInfo[]) => void>
  // updateCanvasContext: QRL<(this: GlobalState, canvas?: Canvas) => void>
  // updateActiveElements: QRL<(this: GlobalState, elements: fabric.Object[]) => void>
}
export interface CanvasStyleData { // 页面全局数据
  width: number,
  height: number,
  scale: number,
  backgroundColor: string,
  opacity: number,
  backgroundImg: string,
  // fontSize: number | string,
}

interface CanvasAction {
  updateCanvasContext: (canvas?: fabric.Canvas) => void
  updateCurrentBlock: (block: BlockInfo[]) => void
  updateActiveElements: (elements: fabric.Object[]) => void
  updateBlocks: (blocks: BlockInfo['canvasStyle'][]) => void
  updateCanvasStyleData: (data: Partial<CanvasStyleData>) => void
  updateCanvasStyleDataByKey: (key: keyof CanvasStyleData, value: any) => void
  updateCanvasStyleDataByObject: (data: Partial<CanvasStyleData>) => void

}

export const useCanvasState = create(
  immer<CanvasStore & CanvasAction>((set, get) => ({
    canvas: undefined,
    blocks: [],
    canvasStyleData: {
      width: 750,
      height: 750,
      scale: 100,
      backgroundColor: '#fff',
      opacity: 1,
      backgroundImg: '',
    } as CanvasStyleData,
    currentBlock: [],
    activeElements: [],
    updateCanvasContext: (canvas?: fabric.Canvas) => {

      set(state => {
        state.canvas = canvas as typeof state.canvas
      })
    },
    updateCurrentBlock: (block: BlockInfo[]) => {
      set(state => {
        state.currentBlock = block as typeof state.currentBlock
      })
    },
    updateActiveElements: (elements: fabric.Object[]) => {
      set(state => {
        state.activeElements = elements as typeof state.activeElements
      })
    },
    updateBlocks: (blocks: BlockInfo[]) => {
      set(state => {
        state.blocks = blocks as typeof state.blocks
      })
    },
    updateCanvasStyleData: (data: Partial<CanvasStyleData>) => {
      set(state => {
        state.canvasStyleData = { ...state.canvasStyleData, ...data }
      })
    },
    updateCanvasStyleDataByKey: (key: keyof CanvasStyleData, value: any) => {
      set(state => {
        (state.canvasStyleData as any)[key] = value
      })
    },
    updateCanvasStyleDataByObject: (data: Partial<CanvasStyleData>) => {
      set(state => {
        state.canvasStyleData = { ...state.canvasStyleData, ...data }
      })
    },
  }))
)