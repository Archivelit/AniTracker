import type { FetchResult } from "@/models/fetchResult";
import type User from "@/models/user";
import { api } from "@/utils/Api";
import FetchErrorHandlingDecorator from "@/utils/FetchErrorHandlingDecorator";

export async function Me(): Promise<FetchResult<User>> {
    return FetchErrorHandlingDecorator(async() => api.get("/me"));
}