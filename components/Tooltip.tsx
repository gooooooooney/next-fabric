import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Tooltip as _Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { PropsWithChildren, ReactElement } from "react"

interface TooltipProps extends PropsWithChildren<{}> {
  tip: ReactElement | string
}
export function Tooltip({tip, children}: TooltipProps) {
  return (
    <TooltipProvider>
      <_Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" className="w-10 border-none  p-0">
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {tip}
        </TooltipContent>
      </_Tooltip>
    </TooltipProvider>
  )
}
