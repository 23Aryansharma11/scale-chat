import ChatBase from "@/components/chat/ChatBase";
import { fetchChats } from "@/fetch/chatsFetch";
import { fetchChatGroupById, fetchChatUsers } from "@/fetch/groupFetch";
import { notFound } from "next/navigation";

const ChatPage = async ({ params }: { params: { id: string } }) => {
    if (params.id.length != 36) {
        return notFound();
    }

    const group: ChatGroupType | null = await fetchChatGroupById(params.id);
    const chats: Array<MessageType | []> = await fetchChats(params.id);
    if (group === null) {
        return notFound();
    }

    const users: Array<GroupChatUserType> | [] = await fetchChatUsers(
        params.id
    );

    return (
        <div>
            <ChatBase group={group} users={users} oldMessages={chats} />
        </div>
    );
};

export default ChatPage;
