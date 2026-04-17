import type WatchStatus from "@/enums/watchStatus"

export type UpdateUserMedia = {
    watchStatus: WatchStatus,
    rating: number,
    episodesWatched: number,
    startDate?: Date,
    completedDate?: Date
}