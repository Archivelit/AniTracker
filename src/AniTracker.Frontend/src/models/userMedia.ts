import type WatchStatus from "@/enums/watchStatus";

type UserMedia = {
    watchStatus: WatchStatus;
    id: string;
    userId: string;
    mediaId: string;
    rating: number | null;
    episodesWatched: number;
    startDate: Date | null;
    completedDate: Date | null;
    isFavorite: boolean;
}

export default UserMedia;