
import { fabric } from "@/lib/fabric";
import { Disposable } from "@/lib/lifeclcye";
import { BaseFabricObject } from "fabric/dist/src/shapes/Object/Object";
import mitt from "mitt";
import { CANVAS_EVENT_SELECTED, Canvas_Event_Object } from "../constants/enum";

type Event ={
  [CANVAS_EVENT_SELECTED.MULTIPLY]: BaseFabricObject[]
  [CANVAS_EVENT_SELECTED.NONE]: void
  [CANVAS_EVENT_SELECTED.ONE]: BaseFabricObject
  [Canvas_Event_Object.CONTEXT_MENU]:fabric.TPointerEventInfo<fabric.TPointerEvent>
  [Canvas_Event_Object.TEXT_MODIFIED]: fabric.Textbox
}

export const emitter = mitt<Event>()

export class EventManager extends Disposable {
  emit = emitter
  constructor(private canvas: fabric.Canvas) { 
    super()
    this.listener()
  }
  private modified (e: fabric.ModifiedEvent<fabric.TPointerEvent>) {
    const target = e.target
    if (target instanceof fabric.Textbox) {
      emitter.emit(Canvas_Event_Object.TEXT_MODIFIED, target)
    }
  }

  private mouseUp(this: fabric.Canvas, ev: fabric.TPointerEventInfo<fabric.TPointerEvent>) {
    // 获取画布视口边界
    const canvasBoundaries = this.calcViewportBoundaries()
  
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
    this.renderAll()
  }

  private contentMenu(opt: fabric.TPointerEventInfo<fabric.TPointerEvent>) {
    if (opt.button === 3 && opt.target) {
      opt.e.preventDefault()
      opt.e.stopPropagation()
      // 当画布上有选中的元素时，才显示右键菜单
      emitter.emit(Canvas_Event_Object.CONTEXT_MENU, opt)
    }
  }
  
  private listener() {
    const canvas = this.canvas
    if (canvas) {
      canvas.on('selection:created', this.selected);
      canvas.on('selection:updated', this.selected);
      canvas.on('selection:cleared', this.selected);
      canvas.on('object:modified', this.modified);
      canvas.on('mouse:up', this.mouseUp)
      canvas.on('mouse:down', this.contentMenu)
    }
  }
  private removeListener() {
    const canvas = this.canvas
    canvas.off('selection:created', this.selected);
    canvas.off('selection:updated', this.selected);
    canvas.off('selection:cleared', this.selected);
    canvas.off('object:modified', this.modified);
    canvas.off('mouse:up', this.mouseUp)
  }
  private selected(this: fabric.Canvas) {
    const activeElements = this.getActiveObjects()
    if (activeElements?.length === 1) {
      const activeElement = activeElements[0]
      console.log(111)
      emitter.emit(CANVAS_EVENT_SELECTED.ONE, activeElement)
    } else if (activeElements?.length > 1) {
      emitter.emit(CANVAS_EVENT_SELECTED.MULTIPLY, activeElements)
    } else {
      emitter.emit(CANVAS_EVENT_SELECTED.NONE)
    }
  }

  override dispose() {
    super.dispose()
    this.removeListener()
  }
}
