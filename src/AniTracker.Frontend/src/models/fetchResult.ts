export type FetchResult<TResult> = {
    success: false;
    statusCode: number;
    message: string;
} | {
    success: true;
    result: TResult;
};
