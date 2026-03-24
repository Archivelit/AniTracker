import { type AxiosResponse, isAxiosError } from "axios";
import type { FetchResult } from "@/models/fetchResult";

export default async function FetchErrorHandlingDecorator<TResult>(func: () => Promise<AxiosResponse<TResult>>): Promise<FetchResult<TResult>> {
    try {
        const response: AxiosResponse<TResult> = await func();
        return {
            success: true,
            result: response.data
        }
    } catch (err) {
        if (isAxiosError(err)) {
            return {
                success: false,
                message: err.response?.data,
                statusCode: err.response?.status ?? 500
            };
        }
        return {
            success: false,
            message: "Unexpected error occurred",
            statusCode: 500
        };
    }
}
