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
export interface MaterialData { // 页面全局数据
  images: File[]
}

interface MaterialDataAction {
  updateMaterialData: (data: Partial<MaterialData>) => void
}

export const useMaterialState = create(
  immer<MaterialData & MaterialDataAction>((set, get) => ({
    images: [] as File[],
    updateMaterialData: (data: Partial<MaterialData>) => {
      set(state => {
        Object.assign(state, data)
      })
    }
  }))
)