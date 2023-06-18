import Container from "typedi";
import { CodeApplication } from "./app";

export class CodeMain {
    main() {
        this.startup()
    }
    private startup() {
        const app = Container.get(CodeApplication)
        app.startup()         
    }
}

