import { PropsWithChildren } from "react";
import {Label as _Label} from '@/components/ui/label'
import { cn } from "@/lib/utils";


interface LabelField extends PropsWithChildren, React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  htmlFor?: string
}
const Label = ({ label, htmlFor,children, ...props  }: LabelField) => {
  return <div
    className={cn('flex flex-col flex-wrap gap-4 px-4', props.className)}
    
  >
    <_Label htmlFor={htmlFor}>
      {label}
    </_Label>
  {children}
  </div>
}
export default Label