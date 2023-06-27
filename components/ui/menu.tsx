"use client"
import { cn } from '@/lib/utils';
import * as MenuPrimitive from '@radix-ui/react-menu';
import * as React from "react"
// import * as MenuPrimitive from "@radix-ui/react-context-menu"
import {
  CheckIcon,
  ChevronRightIcon,
  DotFilledIcon,
} from "@radix-ui/react-icons"
import { useControllableState } from '@/src/use/useControllableState';
import { useCallbackRef } from '@/src/use/useCallbackRef';


const Menu = MenuPrimitive.Root
const MenuAnchor = MenuPrimitive.Anchor

const MenuGroup = MenuPrimitive.Group

const MenuPortal = MenuPrimitive.Portal

// const MenuSub = MenuPrimitive.Sub

const MenuRadioGroup = MenuPrimitive.RadioGroup

interface MenuProps {
  children?: React.ReactNode;
  onOpenChange?(open: boolean): void;
  dir?: MenuPrimitive.Direction;
  modal?: boolean;
}
// const Menu: React.FC<MenuProps> = (props) => {
//   const { modal = true, dir, onOpenChange, children } = props
//   const [open, setOpen] = React.useState(false);
//   const handleOpenChangeProp = useCallbackRef(onOpenChange);

//   const handleOpenChange = React.useCallback(
//     (open: boolean) => {
//       setOpen(open);
//       handleOpenChangeProp(open);
//     },
//     [handleOpenChangeProp]
//   );
//   return <MenuPrimitive.Root
//     dir={dir}
//     open={open}
//     onOpenChange={handleOpenChange}
//     modal={modal}
//     >
//     {children}
//   </MenuPrimitive.Root>
// }
// Menu.displayName = MenuPrimitive.Root.displayName


interface MenuSubProps {
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?(open: boolean): void;
}
const MenuSub: React.FC<MenuSubProps> = (({ open: openProp, defaultOpen, onOpenChange, children }) => {
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });
  return <MenuPrimitive.Sub open={open} onOpenChange={setOpen}>
    {children}
  </MenuPrimitive.Sub>
})
MenuSub.displayName = MenuPrimitive.Sub.displayName



const MenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <MenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRightIcon className="ml-auto h-4 w-4" />
  </MenuPrimitive.SubTrigger>
))
MenuSubTrigger.displayName = MenuPrimitive.SubTrigger.displayName



const MenuSubContent = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.SubContent>
>(({ className, children, ...props }, ref) => {

  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.SubContent
        ref={ref}

        className={cn(
          "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      >
        {children}
      </MenuPrimitive.SubContent>
    </MenuPrimitive.Portal>
  )
})
MenuSubContent.displayName = MenuPrimitive.SubContent.displayName

const MenuContent = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <MenuPrimitive.Portal>
    <MenuPrimitive.Content
      ref={ref}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    >
      {children}
    </MenuPrimitive.Content>
  </MenuPrimitive.Portal>
))
MenuContent.displayName = MenuPrimitive.Content.displayName

const MenuItem = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, children, inset, ...props }, ref) => (
  <MenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
  </MenuPrimitive.Item>
))
MenuItem.displayName = MenuPrimitive.Item.displayName

const MenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenuPrimitive.ItemIndicator>
        <CheckIcon className="h-4 w-4" />
      </MenuPrimitive.ItemIndicator>
    </span>
    {children}
  </MenuPrimitive.CheckboxItem>
))
MenuCheckboxItem.displayName =
  MenuPrimitive.CheckboxItem.displayName

const MenuRadioItem = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenuPrimitive.ItemIndicator>
        <DotFilledIcon className="h-4 w-4 fill-current" />
      </MenuPrimitive.ItemIndicator>
    </span>
    {children}
  </MenuPrimitive.RadioItem>
))
MenuRadioItem.displayName = MenuPrimitive.RadioItem.displayName

const MenuLabel = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, children, inset, ...props }, ref) => (
  <MenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold text-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
  </MenuPrimitive.Label>
))
MenuLabel.displayName = MenuPrimitive.Label.displayName

const MenuSeparator = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
))
MenuSeparator.displayName = MenuPrimitive.Separator.displayName

const MenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Menu,
  MenuAnchor,
  MenuContent,
  MenuItem,
  MenuCheckboxItem,
  MenuRadioItem,
  MenuLabel,
  MenuSeparator,
  MenuShortcut,
  MenuGroup,
  MenuPortal,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  MenuRadioGroup,
}
