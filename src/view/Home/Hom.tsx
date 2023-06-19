import TemplateToolbar from "@/src/view/Home/TemplateToolbar"
import { Aside } from "./Aside"
import { DropMenu } from "./DropMenu"
import { Editor } from "./Editor"

export const Home = () => {
  return <div >
    <div className="flex flex-col justify-center ">
      <div className="mx-auto flex w-full items-center justify-between">
        <DropMenu />
        <TemplateToolbar />
        <div>
          asside
        </div>
      </div>

      <div className="relative">
        <Aside />
        <div className="relative mt-8 flex flex-row justify-center">
          <Editor />
        </div>
      </div>
    </div>
  </div>
}