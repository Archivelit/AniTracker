"use client";

import Image from 'next/image'
import type UserMedia from "@/models/userMedia"
import type Media from '@/models/media';
import ParseWatchStatus from '@/utils/ParseWatchStatus';

type Props = {
    userMedia: UserMedia,
    media: Media,
    eagerLoading?: boolean
}

export default function MediaCard({ userMedia, media, eagerLoading }: Props) {
    return(
        <div className="border w-sm h-fill p-2 rounded-lg m-4 cursor-pointer">
            <Image src="/placeholder.png" width={340} height={300} alt={media.title} className="mx-auto my-2 rounded-md" loading={eagerLoading ? "eager" : "lazy"} />
            <div className='mx-4 block text-xl font-semibold'>
                <p className='mr-auto'>{media.title}</p>
            </div>
            <div className='mx-4 block'>
                <div className="grid-cols-2 flex">
                    <p className='mr-auto'>{ParseWatchStatus(userMedia.watchStatus)}</p>
                    <p className='ml-auto'>{userMedia.episodesWatched}/{media.episodes}</p>
                </div>
            </div>
        </div>
    );
}