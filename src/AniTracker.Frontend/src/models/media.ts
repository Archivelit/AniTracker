import type MediaStatus from "@/enums/mediaStatus";

type Media = {
    id: string,
    title: string,
    episodes: number,
    synopsis?: string,
    airedFrom: Date,
    airedTo?: Date,
    status: MediaStatus 
}

export default Media