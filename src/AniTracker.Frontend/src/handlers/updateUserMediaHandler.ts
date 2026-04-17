"use server";

import type { UpdateUserMedia } from "@/models/dto/updateUserMedia";
import type { GenericFetchResult } from "@/models/fetchResult";
import type Media from "@/models/media";
import type UserMedia from "@/models/userMedia";
import type { UpdateUserMediaFormData } from "@/types/Forms/updateUserMediaFormData";
import { api } from "@/utils/Api";
import { isAxiosError } from "axios";

export default async function handleUserMediaUpdate(data: UpdateUserMediaFormData, 
    currentUserMedia: UserMedia, currentMedia: Media): Promise<GenericFetchResult<undefined>> {
    "use server";

    const updateUserMediaData: UpdateUserMedia = {
        watchStatus: data.watchStatus,
        rating: data.rating,
        episodesWatched: data.episodesWatched,
        startDate: data.startDate,
        completedDate: data.completedDate
    }

    try {
        const response = await api.patch(`/me/medias/${currentUserMedia.id}`, updateUserMediaData);
    } catch(err) {
        if (isAxiosError(err)) {
            return {
                success: false,
                message: err.message ?? "Unexpected error occured",
                statusCode: Number(err.code) ?? 500
            };
        }
    }
    // TODO: Add picture save to storage
    
    return {
        success: true,
        result: undefined
    };
}