import { fabric } from "@/lib/fabric";


export abstract class CanvasPlugin {
  abstract init_plugin(): void
  static plugin_name: string
  constructor(protected canvas: fabric.Canvas) {
    this.init_plugin()
  }
}

export interface CanvasPluginConstructor {
  new(canvas: fabric.Canvas): CanvasPlugin
  plugin_name: string
}