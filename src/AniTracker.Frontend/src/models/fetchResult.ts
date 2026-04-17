export type GenericFetchResult<TResult> = {
    success: false;
    statusCode: number;
    message: string;
} | {
    success: true;
    result: TResult;
};

export type FetchResult = {
    success: false;
    statusCode: number;
    message: string;
} | {
    success: true;
};