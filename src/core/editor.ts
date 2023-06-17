import { fabric } from "@/lib/fabric";
import { CanvasPlugin, CanvasPluginConstructor } from "./plugin/Plugin";
import _ from "lodash";

interface EditorPlugin  {
  instance: CanvasPlugin
  _id: Symbol
}

export class EditorCore {
  private plugins: Map<Symbol,EditorPlugin> = new Map()
  constructor(private canvas: fabric.Canvas) {
  }

  public use(plugin: CanvasPluginConstructor) {
    const instance = Reflect.construct(plugin, [this.canvas])
    const _id = Symbol(plugin.plugin_name)
    const p = {
      _id,
      instance
    } 
    this.plugins.set(_id, p)
  }

}