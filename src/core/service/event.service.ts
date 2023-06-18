import { Disposable } from "@/lib/lifeclcye";
import { Service } from "typedi";
import { fabric } from "@/lib/fabric";
import { BaseFabricObject } from "fabric/dist/src/shapes/Object/Object";
import mitt, { Handler } from "mitt";
import { CANVAS_EVENT_SELECTED, Canvas_Event_Object } from "@/src/constants/enum";

type Events = {
    [CANVAS_EVENT_SELECTED.MULTIPLY]: BaseFabricObject[]
    [CANVAS_EVENT_SELECTED.NONE]: void
    [CANVAS_EVENT_SELECTED.ONE]: BaseFabricObject
    [Canvas_Event_Object.CONTEXT_MENU]: fabric.TPointerEventInfo<fabric.TPointerEvent>
    [Canvas_Event_Object.TEXT_MODIFIED]: fabric.Textbox
    "*": void
}

export const emitter = mitt<Events>()

@Service()
export class EventService extends Disposable {
    emitter = emitter
    constructor() {
        super();
    }
    public on<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>) {
        this.emitter.on(type, handler)
    }
    emit<Key extends keyof Events>(type: Key, event: Events[Key]): void;
    emit<Key extends keyof Events>(type: undefined extends Events[Key] ? Key : never): void;
    public emit<Key extends keyof Events>(type: Key, event?: Events[Key]) {
        if (type && event) {
            this.emitter.emit(type, event)
        }
        else if (!type) {
            this.emitter.emit(type)
        }
    }
    public off<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>) {
        this.emitter.off(type, handler)
    }
    private clear() {
        this.emitter.all.forEach((value, key) => {
            key == "*" ? this.emitter.off("*") : this.emitter.off(key)
        })
        this.emitter.all.clear()
        
    }
    override dispose() {
        super.dispose();
        this.clear()
        
    }
}