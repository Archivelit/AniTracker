import type WatchStatus from "@/enums/watchStatus";

type UserMedia = {
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