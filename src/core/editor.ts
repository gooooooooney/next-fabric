import { fabric } from "@/lib/fabric";
import { CanvasPlugin, CanvasPluginConstructor } from "./plugin/Plugin";

export class EditorCore {
  private plugins: Set<CanvasPlugin> = new Set()
  private plugin_names = new Set<string>()
  constructor(private canvas: fabric.Canvas) {
  }

  public use(plugin:CanvasPluginConstructor) {
    if (this.plugin_names.has(plugin.plugin_name)) return
    const instance = new plugin(this.canvas)
    this.plugins.add(instance)
  }

}