import { fabric } from "@/lib/fabric";
import { ComponentType } from "../constants/enum";
import { BlockInfo, CircleBlock, RectBlock, TextBlock } from "./metadata";


export class CanvasElement {
  constructor(private canvas: fabric.Canvas) { }
  render(block: BlockInfo) {
    switch (block.type) {
      case ComponentType.TextBox:
        return this.renderText( block)
      // case ComponentType.Img:
      //   return renderImage({ canvas, block })
      case ComponentType.Circle:
        return this.renderCircle(block)
      case ComponentType.Rect:
        return this.renderRect(block)
      default:
        return null
    }
  }

  private renderCircle(block: CircleBlock) {
    const CircleBlock = block.canvasStyle
    const circleElement = new fabric.Circle({
      ...CircleBlock
    })
    this.canvas.add(circleElement)
    return circleElement
  }
  private renderText(block: TextBlock) {

    const TextBlock = block.canvasStyle
    const { type, ...styles } = TextBlock
    const textElement = new fabric.Textbox(block.canvasStyle.text!, {
      ...styles
    })

    // 禁止用户垂直缩放
    textElement.setControlVisible('mt', false)
    textElement.setControlVisible('mb', false)

    this.canvas.add(textElement)
    return textElement
  }
  renderRect(block: RectBlock) {

    const rectElement = new fabric.Rect({
      ...block.canvasStyle,
    })

    this.canvas.add(rectElement)
    return rectElement
  }
}