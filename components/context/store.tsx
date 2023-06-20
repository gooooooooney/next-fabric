'use client';

import { fabric } from "@/lib/fabric";
import { BlockInfo } from "@/src/element/metadata";
import { cloneDeep } from "lodash";
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from "react";


type Block = BlockInfo['canvasStyle']
export interface CanvasStore {
  canvas: fabric.Canvas | undefined,
  blocks: Block[];
  canvasStyleData: CanvasStyleData,
  currentBlock: Block[],
  activeElements: fabric.BaseFabricObject[]
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
  setCanvas: (canvas?: fabric.Canvas) => void
  setBlocks: Dispatch<SetStateAction<Block[]>>
  setActiveElements: (elements: fabric.BaseFabricObject[]) => void
  setCurrentBlock: (blocks: Block[]) => void
  setCanvasStyleData: (data: Partial<CanvasStyleData>) => void

}

export const CanvasContext = createContext<CanvasStore & CanvasAction>({} as any)

export const CanvasContextProvider = ({ children }: PropsWithChildren) => {

  const [canvas, setCanvas] = useState<fabric.Canvas | undefined>()
  const [blocks, setBlocks] = useState<Block[]>([])
  const [currentBlock, setCurrent] = useState<Block[]>([])
  const [activeElements, setActiveElements] = useState<fabric.BaseFabricObject[]>([])
  const [canvasStyleData, setCanvasStyle] = useState<CanvasStyleData>({
    width: 390,
    height: 844,
    scale: 100,
    backgroundColor: '#fff',
    opacity: 1,
    backgroundImg: '',
  })
  const setCurrentBlock = (blockList: Block[]) => {
    const findBlock = (id: string | undefined) => {
      if (id) return blocks.findIndex(block => block.id === id)
      return -1
    }
    setCurrent(pre => {
      // 更新当前block的时候自动更新blocks的属性, 还是vue好使
      setBlocks((oldB) => {
        const _blocks = cloneDeep(oldB)
        blockList.forEach(v => {
          const i = findBlock(v?.id)
          if (i != -1) {
            _blocks[i] = v
          }
        })
        return _blocks
      })
      return [...blockList]
    })
  }
  const setCanvasStyleData = (data: Partial<CanvasStyleData>) => {
    setCanvasStyle({
      ...canvasStyleData,
      ...data,
    })
  }
  return (
    <CanvasContext.Provider value={{
      canvas, setCanvas,
      blocks, setBlocks,
      currentBlock, setCurrentBlock,
      activeElements, setActiveElements,
      canvasStyleData, setCanvasStyleData
    }}>
      {children}
    </CanvasContext.Provider>
  )
};

