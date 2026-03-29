import DefaultMediaDialog from "@/components/dialogs/defaultMediaDialog";
import UpdateMediaDialog from "@/components/dialogs/updateMediaDialog";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Drop } from "@/components/ui/drop";
import MediaCard from "@/components/ui/mediaCard";
import MediaStatus from "@/enums/mediaStatus";
import WatchStatus from "@/enums/watchStatus";
import type Media from "@/models/media";
import type UserMedia from "@/models/userMedia";
import type { JSX } from "react";

export default async function MyMedias() {
    const testMedia: Media = {
        id: "2c06f56d-5abf-46fc-a682-8c3b9104917b",
        title: "Very cool title for test",
        episodes: 12,
        synopsis: "Little synopsis for this project",
        airedFrom: new Date(),
        airedTo: new Date(),
        status: MediaStatus.Airing 
    }

    const testUserMedia: UserMedia = {
        id: "7e81fbc5-ce1c-4ccf-9e94-0f38b70bda11",
        userId: "25fed8ff-95fc-40ed-bb5e-32962f9c9bfa",
        mediaId: "2c06f56d-5abf-46fc-a682-8c3b9104917b",
        status: WatchStatus.Watching,
        rating: 4,
        episodesWatched: 10,
        startDate: new Date(),
        completedDate: null,
        isFavorite: true
    }

    const DialogFooter = (): JSX.Element => {
        return(
            <>
                <DialogClose asChild>
                    <Button variant="outline" className="cursor-pointer">
                        Cancel
                    </Button>
                </DialogClose>
                <Button type="submit" className="cursor-pointer">
                    Update
                </Button>
            </>
        )
    }

    return (
        <main className="min-h-screen flex justify-center">
            <div className="h-fit flex w-7xl mx-auto">
                <UpdateMediaDialog  media={testMedia} userMedia={testUserMedia} 
                    dialogTrigger={
                        <div>
                            <MediaCard media={testMedia} userMedia={testUserMedia} />
                        </div>
                    }
                />
                <UpdateMediaDialog  media={testMedia} userMedia={testUserMedia} 
                    dialogTrigger={
                        <div>
                            <MediaCard media={testMedia} userMedia={testUserMedia} />
                        </div>
                    }
                />
                <UpdateMediaDialog  media={testMedia} userMedia={testUserMedia} 
                    dialogTrigger={
                        <div>
                            <MediaCard media={testMedia} userMedia={testUserMedia} />
                        </div>
                    }
                />
            </div>
        </main>
    )
}