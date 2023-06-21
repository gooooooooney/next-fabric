'use client'

import * as React from "react"
import * as ToolbarPrimitive from "@radix-ui/react-toolbar"
import { cn } from "@/lib/utils"
import { buttonVariants } from "./button"

const ToolbarToggleGroup = ToolbarPrimitive.ToggleGroup

const ToolbarToggleItem = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.ToggleItem>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.ToggleItem>
>(({ className, ...props }, ref) => (
  <ToolbarPrimitive.ToggleItem
    ref={ref}
    {...props}
    className={cn(
      buttonVariants({ variant: "ghost", size: "sm" }),
      "ml-0.5 inline-flex h-[25px] shrink-0 grow-0 basis-auto items-center justify-center rounded px-[5px] text-[13px] leading-none text-foreground outline-none transition-colors first:ml-0 ",
      // "text-mauve11 hover:bg-violet3 hover:text-violet11 focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11 ml-0.5 inline-flex h-[25px] shrink-0 grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none outline-none first:ml-0 focus:relative focus:shadow-[0_0_0_2px]",
      // "inline-flex h-[25px] items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      // "hover:bg-accent hover:text-accent-foreground",
      // "hover:bg-violet3 hover:text-violet11 focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11 ml-0.5 inline-flex h-[25px] shrink-0 grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none outline-none first:ml-0 focus:relative focus:shadow-[0_0_0_2px]",

      className,
    )}
  >
    {props.children}
  </ToolbarPrimitive.ToggleItem>
))

ToolbarToggleItem.displayName = ToolbarPrimitive.ToggleItem.displayName

const Toolbar = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Root>
>(({ className, ...props }, ref) =>
  <ToolbarPrimitive.Root
    ref={ref}
    className={cn(
      "flex min-h-full w-full min-w-max rounded-md border border-border bg-white p-2 shadow-md ",
      className
    )}
  >
    {props.children}
  </ToolbarPrimitive.Root>
)



Toolbar.displayName = ToolbarPrimitive.Root.displayName


const ToolbarSeparator = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Separator>
>(  (
  { className, orientation = "vertical", decorative = true, ...props },
  ref
) => (
  <ToolbarPrimitive.Separator
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-[1px] w-full" : "mx-2 w-[1px]",
      className
    )}
    {...props}
  />
))
ToolbarSeparator.displayName = ToolbarPrimitive.Separator.displayName


export {
  ToolbarToggleGroup,
  Toolbar,
  ToolbarToggleItem,
  ToolbarSeparator,
}
