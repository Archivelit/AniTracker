import type MediaStatus from "@/enums/mediaStatus";

type UpdateMedia = {
    title?: string,
    episodes?: number,
    synopsis?: string,
    airedFrom?: Date,
    airedTo?: Date,
    status?: MediaStatus
}

export default UpdateMedia;