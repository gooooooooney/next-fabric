
import { fabric } from "@/lib/fabric";
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
