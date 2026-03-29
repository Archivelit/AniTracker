import type { JSX, SubmitEventHandler } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
    dialogTrigger: JSX.Element;
    dialogFooter: JSX.Element;
    children: JSX.Element;
    dialogDescription: string;
    dialogTitle: string;
    onSubmit?: SubmitEventHandler<HTMLFormElement>;
};


export default function DefaultMediaFormDialog({ dialogTrigger, dialogFooter, children, dialogDescription, dialogTitle, onSubmit }: Props) {
    return (
        <Dialog>
            <form onSubmit={onSubmit}>
                <DialogTrigger asChild>
                    {dialogTrigger}
                </DialogTrigger>
                <DialogContent className="sm:max-w-5xl max-w-lg h-fit px-0 gap-2 flex flex-col" showCloseButton={false}>
                    <DialogHeader className="px-4">
                        <DialogTitle>
                            {dialogTitle}
                        </DialogTitle>
                        <DialogDescription>
                            {dialogDescription}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="p-4 flex-1">
                        {children}
                    </div>
                    <div className="border-t px-4">
                        <DialogFooter className="pt-6 m-0">
                            {dialogFooter}
                        </DialogFooter>
                    </div>
                </DialogContent>
            </form>
        </Dialog>
    )
}