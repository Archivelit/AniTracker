import { cn } from "@/lib/utils";
import { Input } from "./input";
import type { FieldError } from "react-hook-form";

interface FormFieldProps extends React.ComponentProps<"input"> {
    error?: FieldError | undefined;
};

export default function FormField({error, ...props} : FormFieldProps) {
    return (
        <>
        {error && 
            <div className="flex justify-left mx-4 my-2 h-fit">
                <p className="text-red-500 text-sm">{error.message}</p>
            </div>
        }

        <div className="flex m-4 rounded-sm">
            <Input
                {...props}
                className={cn(
                    "border-foreground px-2 py-5 w-full text-lg",
                    error && "border-red-500",
                    props.className
                )}
                />
        </div>
        </>
    );
}