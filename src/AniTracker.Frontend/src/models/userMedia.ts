import type WatchStatus from "@/enums/watchStatus";

type UserMedia = {
    watchStatus: WatchStatus | undefined;
    id: string;
    userId: string;
    mediaId: string;
    status: WatchStatus;
    rating: number | null;
    episodesWatched: number;
    startDate: Date | null;
    completedDate: Date | null;
    isFavorite: boolean;
}

export default UserMedia;