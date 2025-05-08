import Link from "next/link";
import React from "react";
import DeleteGroupChat from "./DeleteGroupChat";
import UpdateGroupChat from "./UpdateGroupChat";

interface ChatData {
    id: string;
    user_id: string;
    title: string;
    passcode: string;
    created_at: string;
}

interface ChatCardProps {
    data: ChatData;
    userId: string;
    token: string;
}

const ChatCard: React.FC<ChatCardProps> = ({ data, userId, token }) => {
    const { title, passcode, created_at, user_id } = data;
    const isOwner = userId === user_id.toString(); // Check if userId matches the user_id in the chat data
    return (
        <div className="max-w-sm rounded-lg shadow-lg bg-white overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300">
            <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <Link
                        href={`/chat/${data.id}`}
                        className="text-lg font-semibold text-gray-900"
                    >
                        {title}
                    </Link>
                    {isOwner && (
                        <div className="flex justify-center items-center gap-2">
                            <UpdateGroupChat group={data} token={token} />
                            <DeleteGroupChat id={data.id} token={token} />
                        </div>
                    )}
                </div>
                <p className="text-sm text-gray-600">Passcode: {passcode}</p>
                <p className="text-xs text-gray-500">
                    Created At: {new Date(created_at).toLocaleString()}
                </p>
            </div>
        </div>
    );
};

export default ChatCard;
