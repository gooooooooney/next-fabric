import { Disposable } from "@/lib/lifeclcye";
import { Service } from "typedi";
import { EventService } from "./service/event.service";
import { FabricCanvas } from "./service/fabric.service";


@Service()
export class CodeApplication extends Disposable {
    constructor(
        public eventService: EventService,
        public canvas: FabricCanvas,
    ) {
        super()
    }
    public startup() {
        console.log('Starting up...');

    }
    public override dispose() {
        super.dispose()
        this.eventService.dispose()
        this.canvas.dispose()
    }
}