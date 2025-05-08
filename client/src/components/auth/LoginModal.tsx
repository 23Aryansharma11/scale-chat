"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";
import { signIn } from "next-auth/react";
const LoginModal = () => {
    const handleLogin = () => {
        signIn("google", {
            callbackUrl: "/dashboard",
            redirect: true,
        });
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="px-6 py-2 text-base font-semibold rounded-full w-full md:w-auto">
                    Get Started
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md rounded-xl px-6 py-8">
                <DialogHeader className="space-y-2">
                    <DialogTitle className="text-3xl font-bold text-center">
                        Welcome to Scale Chat
                    </DialogTitle>
                    <DialogDescription className="text-center text-gray-600">
                        Jump into the conversation. Sign in securely with your
                        Google account.
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-6">
                    <Button
                        variant="outline"
                        onClick={handleLogin}
                        className="w-full flex items-center justify-center gap-3 border-gray-300 py-3 text-base hover:bg-gray-50 transition rounded-lg"
                    >
                        <Image
                            src="/images/google.png"
                            width={20}
                            height={20}
                            alt="Google"
                            className="h-5 w-5"
                        />
                        Continue with Google
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default LoginModal;
