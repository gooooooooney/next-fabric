import TemplateToolbar from "@/src/view/Home/TemplateToolbar"
import { Aside } from "../Aside"
import { DropMenu } from "./DropMenu"
import { Editor } from "./Editor/Editor"
import { Attr } from "@/src/view/Attribute/Attr"

export const Home = () => <div>
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
      <div className="absolute right-0 top-0 mt-8 max-w-[20rem]">
        <Attr />
      </div>

    </div>
  </div>
</div>