import { fabric } from "@/lib/fabric";
import mitt, { Emitter } from "mitt";
import { CANVAS_EVENT_SELECTED, Canvas_Event_Object } from "../constants/enum";
import { EditorCore } from "./editor";
import { InitAligningGuidelinesPlugin } from "./plugin/InitAligningGuidelinesPlugin";
import { CanvasPlugin, CanvasPluginConstructor } from "./plugin/Plugin";
import { CanvasElement } from "@/src/element"
import { emitter, EventManager } from "./event";
import { Disposable } from "@/lib/lifeclcye";

type Event = {
  [CANVAS_EVENT_SELECTED.MULTIPLY]: string
  [CANVAS_EVENT_SELECTED.NONE]: string
  [CANVAS_EVENT_SELECTED.ONE]: string
}
export class CanvasCore extends Disposable {
  private editor: EditorCore
  canvasRenderer: CanvasElement
  eventManager: EventManager
  constructor(private canvas: fabric.Canvas, options?: PlainObject) {
    super()
    console.log(`Fabric.js版本：${fabric.version}`)
    this.editor = new EditorCore(this.canvas)
    this.canvasRenderer = new CanvasElement(canvas)
    this.eventManager = new EventManager(canvas)
    this.init(options)
  }

  public render_canvas() {
    this.canvas.renderAll()
  }

  private init_plugins() {
    this.editor.use(InitAligningGuidelinesPlugin)
  }
  private init(options?: PlainObject) {
    this.load_background(options?.backgroundColor || '#ffffff')
    this.init_plugins()
  }

  private load_background(color: string) {
    this.canvas.set("backgroundColor", color)
    this.render_canvas()
  }

  public override dispose(): void {
    this.canvas.dispose()
    this.eventManager.dispose()
  }
}