"use client";

import { GROUP_CHAT_URL } from "@/lib/apiEndPoints";
import { Trash } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import { clearCache } from "@/actions/common";
import { toast } from "sonner";
import { Button } from "../ui/button";

const DeleteGroupChat = ({ id, token }: { id: string; token: string }) => {
    const deleteGroupChat = async () => {
        try {
            const res = await fetch(`${GROUP_CHAT_URL}/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: token,
                },
            });

            if (!res.ok) {
                throw new Error("Failed to delete group chat");
            }
            clearCache("dashboard");

            const { message } = await res.json();
            toast.success(message);
        } catch (error) {
            console.error(error);
            alert("Error deleting group chat");
        }
    };

    return (
        <Button
            variant={"ghost"}
            onClick={deleteGroupChat}
            title="Delete Chat"
            className=""
        >
            <Trash
                className="text-red-500 hover:text-red-700 transition-colors"
                size={18}
            />
        </Button>
    );
};

export default DeleteGroupChat;
