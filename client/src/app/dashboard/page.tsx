import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import React from "react";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import CreateChat from "@/components/groupChat/CreateChat";
import { fetchChatGroups } from "@/fetch/groupFetch";
import ChatCard from "@/components/groupChat/ChatCard";

const Dashboard = async () => {
    const session: CustomSession | null = await getServerSession(authOptions);
    const groups: Array<ChatGroupType> | [] = await fetchChatGroups(
        session?.user?.token as string
    );

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col pt-20">
            <DashboardNavbar
                name={session?.user?.name!}
                image={session?.user?.image!}
            />
            <div className="px-6 md:px-10 lg:px-20 py-6 w-full">
                {/* Page Heading */}
                <div className="mb-6">
                    <h1 className="text-3xl font-semibold text-gray-900">
                        Welcome back, {session?.user?.name}
                    </h1>
                    <p className="mt-2 text-gray-600 text-sm">
                        Manage your group chats and conversations here.
                    </p>
                </div>

                {/* Create Chat Button */}
                <div className="flex justify-end mb-6">
                    <CreateChat user={session?.user} />
                </div>

                {/* Chat Groups Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-content-center">
                    {groups.map((data) => (
                        <ChatCard
                            key={data.id} // Always use a key for dynamic lists
                            data={data}
                            userId={session?.user?.id as string}
                            token={session?.user?.token as string}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
