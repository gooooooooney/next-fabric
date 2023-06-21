/** @jsxImportSource react */
import type { HtmlHTMLAttributes, PropsWithChildren } from 'react';
import React from 'react';
import { Select, SelectTrigger } from '../ui/select';
import * as SelectPrimitive from "@radix-ui/react-select"



interface SelectItemProps extends PropsWithChildren, HtmlHTMLAttributes<HTMLDivElement>, SelectPrimitive.SelectItemProps {
}
interface SelectProps extends SelectPrimitive.SelectProps {
  range: number[]
}
const NumberSelect = ({ onValueChange, range = [], ...props }: SelectProps) => {
  props.value = props.value || ""
  return (
    <Select onValueChange={onValueChange} {...props}>
      <SelectTrigger
        className="border-shape hover:bg-violet-1 focus:shadow-violet data-[placeholder]:text-violet9 inline-flex h-[35px] items-center justify-center gap-[5px] rounded bg-white  px-[15px] text-[13px] leading-none outline-none focus:shadow-[0_0_0_1px]"
        aria-label="Food"
      >
        <SelectValue placeholder="Select" />
        <Select.Icon className="text-violet">
          <ChevronDownIcon />
        </Select.Icon>
      </SelectTrigger>
      <Select.Portal>
        <Select.Content className="overflow-hidden rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <Select.ScrollUpButton className="text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white">
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="p-[5px]">
            <Select.Group>
              <Select.Label className="font-500 px-[25px] text-xs leading-[25px]">
                Font size
              </Select.Label>
              <Select.Separator className="bg-gray-3 m-[5px] h-[.5px]" />
              {
                range.map((n) => (

                  <div key={n}>
                    <SelectItem value={`${n}`}> {n} </SelectItem>
                  </div>
                ))
              }
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton className="text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select>
  )
};


// const SelectItem =(({ children, className, ...props }: SelectItemProps) => {
const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(({ children, className, ...props }, forwardedRef) => {
  return (
    <Select.Item className={cx('text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet-5 data-[highlighted]:text-violet1', className)} {...props} ref={forwardedRef}>
      <Select.ItemText >{children}</Select.ItemText>
      <Select.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  );
});


export default qwikify$(NumberSelect, { eagerness: "visible" });