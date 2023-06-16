import { fabric } from "@/lib/fabric";
import mitt,{ Emitter } from "mitt";
import { CANVAS_EVENT_SELECTED } from "../constants/enum";
import { EditorCore } from "./editor";
import { InitAligningGuidelinesPlugin } from "./plugin/InitAligningGuidelinesPlugin";
import { CanvasPlugin, CanvasPluginConstructor } from "./plugin/Plugin";
import { CanvasElement } from "@/src/element"
import { emitter } from "./event";

type Event ={
  [CANVAS_EVENT_SELECTED.MULTIPLY]: string
  [CANVAS_EVENT_SELECTED.NONE]: string
  [CANVAS_EVENT_SELECTED.ONE]: string
}
export class CanvasCore {
  private editor: EditorCore
  canvasRenderer: CanvasElement
  constructor(private canvas: fabric.Canvas, options?: PlainObject) {
    console.log(`Fabric.js版本：${fabric.version}`)
    this.editor = new EditorCore(this.canvas)
    this.canvasRenderer = new CanvasElement(canvas)
    this.init(options)
  }

  public render_canvas() {
    this.canvas.renderAll()
  }

  private init_plugins() {
    this.editor.use(InitAligningGuidelinesPlugin)
  }

  private initEvent() {
    const selected = () => {
      const activeElements = this.canvas.getActiveObjects()
      if (activeElements?.length === 1) {
        const activeElement = activeElements[0]
        emitter.emit(CANVAS_EVENT_SELECTED.ONE, activeElement)
      } else if (activeElements?.length > 1) {
        emitter.emit(CANVAS_EVENT_SELECTED.MULTIPLY, activeElements)
      } else {
        emitter.emit(CANVAS_EVENT_SELECTED.NONE)
      }
    }
  }
  private init(options?: PlainObject) {
    this.load_background(options?.backgroundColor || '#ffffff')
    this.init_plugins()
  }

  private load_background(color: string) {
    this.canvas.set("backgroundColor", color)
    this.render_canvas()
  }

}