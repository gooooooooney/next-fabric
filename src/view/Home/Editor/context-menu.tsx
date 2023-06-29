'use client'
import {
  Menu,
  MenuAnchor,
  MenuCheckboxItem,
  MenuContent,
  MenuItem,
  MenuLabel,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuShortcut,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
} from "@/components/ui/menu"
import { use, useCallback, useEffect, useState } from "react"
import * as MenuPrimitive from '@radix-ui/react-menu';
import { useCallbackRef } from "@/src/use/useCallbackRef";
import React from "react";
import { useCanvasContext } from "@/src/use/useCanvasStore";
import { AlertDialog } from "@/components/alert-dialog";

interface Point { x: number, y: number }

export function ContextMenuWithoutTrigger({ open: openProp, onOpenChange, modal = true, dir, position = { x: 0, y: 0 } }: MenuPrimitive.MenuProps & { position?: Point }) {
  const state = useCanvasContext()
  const [open, setOpen] = useState(openProp)
  const [openDialog, setOpenDialog] = useState(false)
  const handleOpenChangeProp = useCallbackRef(onOpenChange);
  const pointRef = React.useRef<Point>(position);
  const handleOpenChange = useCallback(
    (open: boolean) => {
      setOpen(open);
      handleOpenChangeProp(open);
    },
    [handleOpenChangeProp]
  );
  useEffect(() => {
    setOpen(openProp)
  }, [openProp])
  const virtualRef = React.useRef({
    getBoundingClientRect: () => DOMRect.fromRect({ width: 0, height: 0, ...pointRef.current }),
  });
  useEffect(() => {
    pointRef.current = position;
  }, [position])
  return (
    <Menu
      open={open}
      dir={dir}
      modal={modal}
      onOpenChange={handleOpenChange}
    >
      <MenuAnchor virtualRef={virtualRef} className="inline-block" />
      <MenuContent
        side="right"
        sideOffset={2}
        align="start"
        className="w-40">
        <MenuItem onSelect={() => {
          state.activeElements?.forEach((element => {
            // FABRICV6: https://github.com/fabricjs/fabric.js/issues/8299
            state.canvas?.bringObjectToFront(element)
          }))
        }} >
          Bring to front
          <MenuShortcut>⌘[</MenuShortcut>
        </MenuItem>
        <MenuItem onSelect={() => {
          state.activeElements?.forEach((element => {
            state.canvas?.sendObjectToBack(element)
          }))
        }} >
          Send to back
          <MenuShortcut>⌘]</MenuShortcut>
        </MenuItem>
        <MenuItem onSelect={() => {
          state.activeElements?.forEach((element => {
            state.canvas?.sendObjectBackwards(element)
          }))
        }} >
          Bring forward
          <MenuShortcut>⌘R</MenuShortcut>
        </MenuItem>
        <MenuItem onSelect={() => {
          state.activeElements?.forEach((element => {
            state.canvas?.remove(element)
          }))
        }} >
          Delete
          <MenuShortcut>⌘R</MenuShortcut>
        </MenuItem>
        <AlertDialog
          onCancel={() => {
            setOpenDialog(false)
          }}
          onConfirm={() => {
            setOpenDialog(false)
            handleOpenChange(false)
            state.canvas?.clear()
            state.canvas?.set({ backgroundColor: 'white' })
            state.canvas?.renderAll()
          }}
          open={openDialog} >
          <MenuItem onSelect={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setOpenDialog(true)
          }}>
            Clear
            <MenuShortcut>⌘R</MenuShortcut>
          </MenuItem>
        </AlertDialog>

        {/* <MenuSub>
          <MenuSubTrigger inset>More Tools</MenuSubTrigger>
          <MenuSubContent className="w-48">
            <MenuItem>
              Save Page As...
              <MenuShortcut>⇧⌘S</MenuShortcut>
            </MenuItem>
            <MenuItem>Create Shortcut...</MenuItem>
            <MenuItem>Name Window...</MenuItem>
            <MenuSeparator />
            <MenuItem>Developer Tools</MenuItem>
          </MenuSubContent>
        </MenuSub>
        <MenuSeparator />
        <MenuCheckboxItem checked>
          Show Bookmarks Bar
          <MenuShortcut>⌘⇧B</MenuShortcut>
        </MenuCheckboxItem>
        <MenuCheckboxItem>Show Full URLs</MenuCheckboxItem>
        <MenuSeparator />
        <MenuRadioGroup value="pedro">
          <MenuLabel inset>People</MenuLabel>
          <MenuSeparator />
          <MenuRadioItem value="pedro">
            Pedro Duarte
          </MenuRadioItem>
          <MenuRadioItem value="colm">Colm Tuite</MenuRadioItem>
        </MenuRadioGroup> */}
      </MenuContent>
    </Menu>
  )
}
