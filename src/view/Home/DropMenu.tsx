'use client'
import { Icons } from "@/components/icons"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut
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
              导入 <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem  onSelect={() => onSaveTmp()} >
            保存为模板 <DropdownMenuShortcut >⌘+N</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem  onSelect={() => onDownload()} >
            保存为图片 <DropdownMenuShortcut >⇧+⌘+N</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
  </DropdownMenu>
}