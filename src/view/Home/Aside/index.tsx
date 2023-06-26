"use client"
import { useAttrState } from "@/src/store/attrState"
import { Color } from "./Color"
import { ImageTemplate } from "./Image/image-template"
import { ShapeTemplate } from "./Shape/shape-template"
import { TextTemplate } from "./Text/text-template"

export const Aside =() => {
  const attrState = useAttrState()
  switch (true) {
    case attrState.shouldShowColor:
      return <Color />
    case attrState.shouldShowImage:
      return <ImageTemplate />
    case attrState.shouldShowText:
      return <TextTemplate />
    case attrState.shouldShowShape:
      return <ShapeTemplate />
    default:
      return null
  }
}