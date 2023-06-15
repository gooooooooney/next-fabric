'use client'
import { Icons } from "@/components/icons"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu"

export const DropMenu = () => {

  const onSaveTmp = () => {}
  const onDownload = () => {}
  return <DropdownMenu>
    <DropdownMenuTrigger>
      <Icons.menu />
    </DropdownMenuTrigger>
     <DropdownMenuPortal>
        <DropdownMenuContent align='start' className="DropdownMenuContent" sideOffset={5}>
          <DropdownMenuItem  className="DropdownMenuItem">
              导入 <div className="RightSlot">⌘+T</div>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => onSaveTmp()} >
            保存为模板 <div className="RightSlot">⌘+N</div>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => onDownload()} >
            保存为图片 <div className="RightSlot">⇧+⌘+N</div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
  </DropdownMenu>
}