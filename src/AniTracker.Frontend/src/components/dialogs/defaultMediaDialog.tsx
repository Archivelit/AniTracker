import type { JSX } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type Props = {
    dialogTrigger: JSX.Element;
    dialogFooter: JSX.Element;
    children: JSX.Element;
    dialogDescription: string;
    dialogTitle: string;
};


export default function DefaultMediaFormDialog({ dialogTrigger, dialogFooter, children, dialogDescription, dialogTitle }: Props) {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    {dialogTrigger}
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm px-0 pb-4">
                <DialogHeader className="px-4">
                    <DialogTitle>
                        {dialogTitle}
                    </DialogTitle>
                    <DialogDescription>
                        {dialogDescription}
                    </DialogDescription>
                </DialogHeader>
                <div className="px-4">
                    {children}
                </div>
                <div className="border-t px-4">
                    <DialogFooter className="pt-4">
                        {dialogFooter}
                    </DialogFooter>
                </div>
                </DialogContent>
            </form>
        </Dialog>
    )
}