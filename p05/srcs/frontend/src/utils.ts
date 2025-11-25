import { ipPort } from "./main";

export async function apiFetch(endpoint: string, option: RequestInit = {}): Promise<any> {
    const headers: Record<string, string> = { ...(option.headers as Record<string, string> | {})};
    if (!(option.body instanceof FormData))
        headers["Content-Type"] = "application/json";
    try {
        console.log(`${ipPort}${endpoint}`);
        const res = await fetch(`${ipPort}${endpoint}`, {...option, headers, credentials: "include"});
        const data = await res.json();

        if (!res.ok)
        {
            throw data.error;
        }
        return data;
    }
    catch (e: any)
    {
        console.error(e);
        throw e;
    }
}