import { fabric } from "@/lib/fabric";
import { create } from 'zustand'
import { BlockInfo } from "../element/metadata";
import { immer } from 'zustand/middleware/immer'

type Block = BlockInfo['canvasStyle']
export interface CanvasStore {
  canvas: fabric.Canvas | undefined,
  blocks: Block[];
  canvasStyleData: CanvasStyleData,
  currentBlock: Block[],
  activeElements: fabric.BaseFabricObject[]
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
  updateCurrentBlock: (block: Block[]) => void
  updateActiveElements: (elements: fabric.BaseFabricObject[]) => void
  updateBlocks: (blocks: Block[]) => void
  updateCanvasStyleData: (data: Partial<CanvasStyleData>) => void
  updateCanvasStyleDataByKey: (key: keyof CanvasStyleData, value: any) => void
  updateCanvasStyleDataByObject: (data: Partial<CanvasStyleData>) => void

}

export const useCanvasState = create(
  immer<CanvasStore & CanvasAction>((set, get) => ({
    canvas: undefined,
    blocks: [],
    canvasStyleData: {
      width: 390,
      height: 844,
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
    updateCurrentBlock: (block: Block[]) => {
      set(state => {
        state.currentBlock = block as typeof state.currentBlock
        state.blocks = [...state.blocks.filter(v => state.currentBlock.some(b => b.id !== v.id)), ...state.currentBlock]
        debugger
        console.log(state.blocks)
      })
    },
    updateActiveElements: (elements: fabric.BaseFabricObject[]) => {
      set(state => {
        state.activeElements = elements as typeof state.activeElements
      })
    },
    updateBlocks: (blocks: Block[]) => {
      set(state => {
        console.log(blocks)
        state.blocks = blocks as any
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