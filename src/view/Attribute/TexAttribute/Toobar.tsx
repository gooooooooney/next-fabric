import React from 'react';
import { Toolbar } from '@/components/ui/toolbar';
import { ToggleGroup, ToolbarSeparator, ToolbarToggleItem } from '@radix-ui/react-toolbar';
import { Icons } from '@/components/icons';

const TextToolbar = () => (
  <Toolbar
    aria-label="Formatting options"
  >
    <ToggleGroup type="multiple" aria-label="Text formatting">
      <ToolbarToggleItem
        value="bold"
        aria-label="Bold"
      >
        <Icons.bold />
      </ToolbarToggleItem>
      <ToolbarToggleItem
        value="italic"
        aria-label="Italic"
      >
        <Icons.italic />
      </ToolbarToggleItem>
      <ToolbarToggleItem
        value="strikethrough"
        aria-label="Strike through"
      >
        <Icons.strikethrough />
      </ToolbarToggleItem>
    </ToggleGroup>
    <ToolbarSeparator />
    <ToggleGroup type="single" defaultValue="center" aria-label="Text alignment">
      <ToolbarToggleItem
        value="left"
        aria-label="Left aligned"
      >
        <Icons.alignLeft />
      </ToolbarToggleItem>
      <ToolbarToggleItem
        value="center"
        aria-label="Center aligned"
      >
        <Icons.alignCenter />
      </ToolbarToggleItem>
      <ToolbarToggleItem
        value="right"
        aria-label="Right aligned"
      >
        <Icons.alignRight />
      </ToolbarToggleItem>
    </ToggleGroup>
  </Toolbar>
);

export default TextToolbar;