"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "../common/UserAvatar";
import { Suspense, useState } from "react";
import dynamic from "next/dynamic";
const LogOutModel = dynamic(() => import("@/components/auth/LogoutModel"));

const ProfileMenu = ({ name, image }: { name: string; image?: string }) => {
    const [isOpenLogout, setIsOpenLogout] = useState(false);
    return (
        <>
            {isOpenLogout && (
                <Suspense fallback={<div>Loading</div>}>
                    <LogOutModel
                        open={isOpenLogout}
                        setOpen={setIsOpenLogout}
                    />
                </Suspense>
            )}
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <UserAvatar name={name} image={image} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsOpenLogout(true)}>
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default ProfileMenu;
