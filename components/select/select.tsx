/** @jsxImportSource react */
import { HtmlHTMLAttributes, PropsWithChildren, useEffect, useState } from 'react';
import {
  Select as _Select,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectItem,
  SelectGroup,
  SelectContent
} from '../ui/select';
import * as SelectPrimitive from "@radix-ui/react-select"
import React from 'react';
import { Icons } from '../icons';

interface SelectProps extends SelectPrimitive.SelectProps {
  items: (number | string | PlainObject)[],
  label: React.ReactNode,
  prop?: string,
}
export const Select = ({ onValueChange, label, prop, items = [], ...props }: SelectProps) => {
  props.value = props.value || ""
  const [list, setList] = useState<(string | number)[]>([])
  useEffect(() => {
    setList(items.map((n) => {
      if (typeof n === "object") {
        return n[prop || "value"]
      }
      return n
    }))
  }, [items, prop])
  return (
    <_Select onValueChange={onValueChange} {...props}>
      <SelectTrigger
        className="border-shape hover:bg-violet-1 focus:shadow-violet data-[placeholder]:text-violet9 inline-flex h-[35px] items-center justify-center gap-[5px] rounded bg-white  px-[15px] text-[13px] leading-none outline-none focus:shadow-[0_0_0_1px]"
      >
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content className="overflow-hidden rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <SelectPrimitive.ScrollUpButton className="text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white">
            <Icons.chevronDown />
          </SelectPrimitive.ScrollUpButton>
          <SelectPrimitive.Viewport className="p-[5px]">
            <SelectGroup>
              <SelectLabel className="font-500 px-[25px] text-xs leading-[25px]">
                {label}
              </SelectLabel>
              {
                list.map((n) => (

                  <div key={n}>
                    <SelectItem  value={`${n}`}> 
                      <span style={{
                        fontFamily: typeof n === "string" ? n : undefined,
                      }}>{n}</span> 
                    </SelectItem>
                  </div>
                ))
              }
            </SelectGroup>
          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton className="text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white">
            <Icons.chevronDown />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
      {/* <SelectContent>

        <SelectGroup>
          <SelectLabel className="font-500 px-[25px] text-xs leading-[25px]">
            Font size
          </SelectLabel>
          {
            range.map((n) => (

              <div key={n}>
                <SelectItem value={`${n}`}> {n} </SelectItem>
              </div>
            ))
          }
        </SelectGroup>

      </SelectContent> */}
    </_Select>
  )
};





