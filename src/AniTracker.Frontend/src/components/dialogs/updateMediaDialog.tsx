"use client";

import { Button } from "../ui/button";
import { Controller, useForm } from "react-hook-form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import DefaultMediaDialog from "./defaultMediaDialog";
import { DialogClose } from "../ui/dialog";
import { Drop } from "../ui/drop";
import type { JSX } from "react/jsx-dev-runtime";
import { Input } from "../ui/input";
import type Media from "@/models/media";
import type UserMedia from "@/models/userMedia";
import { DatePicker } from "../ui/datePicker";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserMediaValidationSchema } from "@/utils/ValidationSchemas";
import type { UpdateUserMediaFormData } from "@/types/Forms/updateUserMediaFormData";
import handleUserMediaUpdate from "@/handlers/updateUserMediaHandler";

type Props = {
    dialogTrigger: JSX.Element;
    media: Media;
    userMedia: UserMedia;
};

export default function UpdateMediaDialog({ dialogTrigger, media, userMedia }: Props) {
    const { control, register, handleSubmit, formState } = useForm<UpdateUserMediaFormData>({ defaultValues: {
            watchStatus: userMedia.watchStatus,
            rating: userMedia.rating ?? 0,
            episodesWatched: userMedia.episodesWatched,
            startDate: userMedia.startDate ? new Date(userMedia.startDate) : undefined,
            completedDate: userMedia.completedDate ? new Date(userMedia.completedDate) : undefined,
        },
        resolver: zodResolver(updateUserMediaValidationSchema)
    });
    
    async function onSubmit(data: UpdateUserMediaFormData): Promise<void> {
        await handleUserMediaUpdate(data, userMedia, media);
    }

    function DialogFooter(): JSX.Element {
        return(
            <>
                <DialogClose asChild>
                    <Button variant="outline" className="cursor-pointer" disabled={formState.isSubmitting}>
                        Cancel
                    </Button>
                </DialogClose>
                <Button type="submit" className="cursor-pointer" disabled={formState.isSubmitting}>
                    Update
                </Button>
            </>
        )
    }

    return(
        <DefaultMediaDialog dialogTrigger={dialogTrigger}
            dialogDescription={media.synopsis}
            dialogTitle={media.title}
            dialogFooter={<DialogFooter/>}
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex gap-4">
                <Drop />

                <div className="block w-full">
                    <div className="flex gap-4 mb-4">
                        <Controller control={control}
                            name="watchStatus"
                            render={({field}) => (
                                <Select onValueChange={(value) => field.onChange(Number(value))}>
                                <SelectTrigger className="cursor-pointer">
                                    <SelectValue placeholder="Watch Status"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="0">Plan To Watch</SelectItem>
                                        <SelectItem value="1">Currently Watching</SelectItem>
                                        <SelectItem value="4">On Hold</SelectItem>
                                        <SelectItem value="5">Dropped</SelectItem>
                                        <SelectItem value="3">Completed</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                                </Select>
                            )}
                        />

                        <Input placeholder="Rating" 
                            type="number" 
                            min="0" max="10" 
                            className="w-32" 
                            inputMode="numeric" 
                            {...register("rating", {
                                required: true,
                                min: 0,
                                max: 10,
                                valueAsNumber: true,
                            })} 
                        />
                        <span className="text-muted-foreground mt-1">
                            /10
                        </span>

                        <Input placeholder="Episodes watched" 
                            type="number" 
                            min="0" 
                            className="w-40" 
                            inputMode="numeric" 
                            {...register("episodesWatched", {
                                required: true,
                                min: 0,
                                valueAsNumber: true,
                            })} 
                        />
                        <span className="text-muted-foreground mt-1">
                            /{media.episodes}
                        </span>
                    </div>
                    
                    <div className="flex gap-4">
                        <Controller control={control}
                            name="startDate"
                            render={({field}) => (
                                <DatePicker onChange={(date) => field.onChange(date)} placeholder="Start date"/>
                            )}
                        />
                            
                        <Controller control={control}
                            name="completedDate"
                            render={({field}) => (
                                <DatePicker onChange={(date) => field.onChange(date)} placeholder="End date"/>
                            )}
                        />
                    </div>
                </div>
            </div>
        </DefaultMediaDialog>
    );
}