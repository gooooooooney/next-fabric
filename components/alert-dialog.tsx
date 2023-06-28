import {
  AlertDialog as _AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

interface AlertDialogProps extends React.HTMLAttributes<HTMLDivElement>, React.PropsWithChildren<{}> {
  open: boolean
  alertTitle?: React.ReactNode
  description?: React.ReactNode
  cancelText?: React.ReactNode
  confirmText?: React.ReactNode
  onConfirm?: () => void
  onCancel?: () => void
}

export function AlertDialog(props: AlertDialogProps) {
  const {
    open,
    alertTitle = "Are you absolutely sure?",
    description = "This action cannot be undone. This will permanently clear your canvas.",
    cancelText = "Cancel",
    confirmText = "Continue",
    onConfirm,
    onCancel,
    children,
    ...rest } = props
  return (
    <_AlertDialog open={open}>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>{cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>{confirmText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </_AlertDialog>
  )
}
