
import { fabric } from "@/lib/fabric";
import { BaseFabricObject } from "fabric/dist/src/shapes/Object/Object";
import mitt from "mitt";
import { CANVAS_EVENT_SELECTED } from "../constants/enum";

type Event ={
  [CANVAS_EVENT_SELECTED.MULTIPLY]: BaseFabricObject[]
  [CANVAS_EVENT_SELECTED.NONE]: void
  [CANVAS_EVENT_SELECTED.ONE]: BaseFabricObject
}

export const emitter = mitt<Event>()
