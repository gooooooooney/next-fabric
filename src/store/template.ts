import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export interface TemplateCanvas {
  id?: number,
  width: number,
  height: number,
  src: string,
  version: string,
  objects: any[],
  background: string | Record<string, any>
}

export interface TemplateState {
  currentTmp: TemplateCanvas | null
  tmps: TemplateCanvas[]
}

interface TemplateAction {
  updateCurrentTmp: (tmp: TemplateCanvas) => void
  updateTmps: (tmps: TemplateCanvas[]) => void
}


export const useTmpStore = create(
  immer<TemplateState>((set, get) => ({
    currentTmp: null,
    tmps: [],
    updateCurrentTmp: (tmp: TemplateCanvas) => {
      set(state => {
        state.currentTmp = tmp
      })
    },
    addTmps: (tmp: TemplateCanvas) => {
      set(state => {
        state.tmps.push(tmp)
      })
    }
  })))