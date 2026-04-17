import type WatchStatus from "@/enums/watchStatus";

export type UpdateUserMediaFormData = {
    watchStatus: WatchStatus;
    rating: number;
    episodesWatched: number;
    startDate?: Date;
    completedDate?: Date;
};