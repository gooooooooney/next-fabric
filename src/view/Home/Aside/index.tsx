"use client"
import { useAttrState } from "@/src/store/attrState"
import { Color } from "./Color"

export const Aside =() => {
  const attrState = useAttrState()
  switch (true) {
    case attrState.shouldShowColor:
      return <Color />
    default:
      return null
  }
}