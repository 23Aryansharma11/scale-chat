import { CHATS_URL } from "@/lib/apiEndPoints";

export async function fetchChats(groupId: string) {
    const res = await fetch(`${CHATS_URL}/${groupId}`, {
        cache: "no-cache",
        method: "POST",
    });
    console.log(res);
    if (!res.ok) {
        throw new Error("Failed to fetch chats");
    }
    const response = await res.json();

    if (response.data) {
        return response?.data;
    }
    return [];
}
