import { forEach } from 'lodash'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export interface AttrState {
  shouldShowTemplate: boolean
  shouldShowImage: boolean
  shouldShowText: boolean
  shouldShowShape: boolean
  shouldShowColor: boolean
}

interface AttrAction {
  updateAttrState: (data: Partial<AttrState>) => void
  updateAttrStateByKey: (key: keyof AttrState, value: any) => void
}
const initState = {
  shouldShowTemplate: false,
  shouldShowImage: false,
  shouldShowText: false,
  shouldShowShape: false,
  shouldShowColor: false,
}

export const useAttrState = create(
  immer<AttrState & AttrAction>((set, get) => ({
    ...initState,
    updateAttrState: (data: Partial<AttrState>) => {
      set(state => {
        Object.assign(state, data)
      })
    },
    updateAttrStateByKey: (key: keyof AttrState, value: any) => {
      set(state => {
        forEach(state, (v, k) => {
          if (k === key) {
            state[k] = value
          } else {
            if (typeof state[k as keyof AttrState] === 'boolean') {
              state[k as keyof AttrState] = false
            }

          }
        })
        state[key] = value
      })
    }
  })
  ))