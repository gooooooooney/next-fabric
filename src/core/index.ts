import { fabric } from "@/lib/fabric";
import mitt, { Emitter } from "mitt";
import { CANVAS_EVENT_SELECTED, Canvas_Event_Object } from "../constants/enum";
import { EditorCore } from "./editor";
import { InitAligningGuidelinesPlugin } from "./plugin/InitAligningGuidelinesPlugin";
import { CanvasPlugin, CanvasPluginConstructor } from "./plugin/Plugin";
import { CanvasElement } from "@/src/element"
import { emitter } from "./event";
import { Disposable } from "@/lib/lifeclcye";

type Event = {
  [CANVAS_EVENT_SELECTED.MULTIPLY]: string
  [CANVAS_EVENT_SELECTED.NONE]: string
  [CANVAS_EVENT_SELECTED.ONE]: string
}
export class CanvasCore extends Disposable {
  private editor: EditorCore
  canvasRenderer: CanvasElement
  constructor(private canvas: fabric.Canvas, options?: PlainObject) {
    super()
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

  public initEvent() {
    const canvas = this.canvas
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
    const modified = (e: fabric.ModifiedEvent<fabric.TPointerEvent>) => {
      const target = e.target
      if (target instanceof fabric.Textbox) {
        emitter.emit(Canvas_Event_Object.TEXT_MODIFIED, target)
      }
    }

    const mouseUp = (ev: fabric.TPointerEventInfo<fabric.TPointerEvent>) => {
      // 获取画布视口边界
      const canvasBoundaries = this.canvas.calcViewportBoundaries()

      // 矩形本身
      const obj = ev.target
      if (!obj) return

      // 矩形的边界
      const objBoundingRect = obj.getBoundingRect()

      // 【公式1】
      if (objBoundingRect.left < canvasBoundaries.tl.x) {
        obj.left = canvasBoundaries.tl.x + 10
      }

      // 【公式2】
      if (objBoundingRect.left + objBoundingRect.width > canvasBoundaries.br.x) {
        obj.left = canvasBoundaries.br.x - objBoundingRect.width - 10
      }

      // 【公式3】
      if (objBoundingRect.top < canvasBoundaries.tl.y) {
        obj.top = canvasBoundaries.tl.y + 10
      }

      // 【公式4】
      if (objBoundingRect.top + objBoundingRect.height > canvasBoundaries.br.y) {
        obj.top = canvasBoundaries.br.y - objBoundingRect.height - 10
      }

      // 刷新画布
      this.render_canvas()
    }


    const contentMenu = (opt: fabric.TPointerEventInfo<fabric.TPointerEvent>) => {
      if (opt.button === 3 && opt.target) {
        opt.e.preventDefault()
        opt.e.stopPropagation()
        // 当画布上有选中的元素时，才显示右键菜单
        emitter.emit(Canvas_Event_Object.CONTEXT_MENU, opt)
      }
    }

    const listener = () => {
      if (canvas) {
        canvas.on('selection:created', selected);
        canvas.on('selection:updated', selected);
        canvas.on('selection:cleared', selected);
        canvas.on('object:modified', modified);
        canvas.on('mouse:up', mouseUp)
        canvas.on('mouse:down', contentMenu)
      }
    }
    const removeListener = () => {
      canvas.off('selection:created', selected);
      canvas.off('selection:updated', selected);
      canvas.off('selection:cleared', selected);
      canvas.off('object:modified', modified);
      canvas.off('mouse:up', mouseUp)
    }

    return {
      listener,
      removeListener
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

  public override dispose(): void {
    this.canvas.dispose()
  }

}