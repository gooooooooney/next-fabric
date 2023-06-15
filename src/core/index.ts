import { fabric } from "@/lib/fabric";
import mitt,{ Emitter } from "mitt";
import { CANVAS_EVENT_SELECTED } from "../constants/enum";

type Event ={
  [CANVAS_EVENT_SELECTED.MULTIPLY]: string
  [CANVAS_EVENT_SELECTED.NONE]: string
  [CANVAS_EVENT_SELECTED.ONE]: string
}
export class Canvas {
  private event = mitt<Event>()
  constructor(private canvas: fabric.Canvas) {
    console.log(`Fabric.js版本：${fabric.version}`)
  }
}