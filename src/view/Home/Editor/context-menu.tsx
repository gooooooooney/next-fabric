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
import { useCallback, useEffect, useState } from "react"
import * as MenuPrimitive from '@radix-ui/react-menu';
import { useCallbackRef } from "@/src/use/useCallbackRef";
import React from "react";

interface Point { x: number, y: number }

export function ContextMenuWithoutTrigger({ open:openProp, onOpenChange, modal = true, dir, position = { x: 0, y: 0 } }: MenuPrimitive.MenuProps & { position?: Point }) {
  const [open, setOpen] = useState(openProp)
  const handleOpenChangeProp = useCallbackRef(onOpenChange);
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
    getBoundingClientRect: () => DOMRect.fromRect({ width: 0, height: 0, ...position }),
  });
  return (
    <Menu
      open={open}
      dir={dir}
      modal={modal}
      onOpenChange={handleOpenChange}
    >
      <MenuAnchor virtualRef={virtualRef} className="inline-block" />
      <MenuContent className="w-64">
        <MenuItem inset>
          Back
          <MenuShortcut>⌘[</MenuShortcut>
        </MenuItem>
        <MenuItem inset disabled>
          Forward
          <MenuShortcut>⌘]</MenuShortcut>
        </MenuItem>
        <MenuItem inset>
          Reload
          <MenuShortcut>⌘R</MenuShortcut>
        </MenuItem>
        <MenuSub>
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
        </MenuRadioGroup>
      </MenuContent>
    </Menu>
  )
}
