"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "../ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useParams } from "next/navigation";
import axios from "axios";
import { CHAT_GROUP_USERS } from "@/lib/apiEndPoints";
import { toast } from "sonner";

export default function ChatUserDialog({
    open,
    setOpen,
    group,
}: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    group: ChatGroupType;
}) {
    const params = useParams();
    const [state, setState] = useState({
        name: "",
        passcode: "",
    });

    useEffect(() => {
        const data = localStorage.getItem(params["id"] as string);
        if (data) {
            const jsonData = JSON.parse(data);
            if (jsonData?.name && jsonData?.group_id) {
                setOpen(false);
            }
        }
    }, [params, setOpen]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (group.passcode !== state.passcode) {
            toast.error("Incorrect passcode. Please try again.");
            return;
        }

        const localData = localStorage.getItem(params["id"] as string);
        if (!localData) {
            try {
                const { data } = await axios.post(CHAT_GROUP_USERS, {
                    name: state.name,
                    group_id: params["id"] as string,
                });
                localStorage.setItem(
                    params["id"] as string,
                    JSON.stringify(data?.data)
                );
            } catch (error) {
                toast.error("Something went wrong. Please try again!");
                return;
            }
        }

        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-gray-900">
                        Join Chat Room
                    </DialogTitle>
                    <DialogDescription className="text-sm text-gray-500">
                        Enter your name and 6-digit passcode to continue.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                            Your Name
                        </label>
                        <Input
                            id="name"
                            placeholder="Enter your name"
                            value={state.name}
                            onChange={(e) =>
                                setState({ ...state, name: e.target.value })
                            }
                            className="rounded-md border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                    </div>
                    <div className="space-y-2">
                        <label
                            htmlFor="passcode"
                            className="text-sm font-medium"
                        >
                            6-Digit Passcode
                        </label>
                        <InputOTP
                            id="passcode"
                            value={state.passcode}
                            onChange={(value) =>
                                setState({ ...state, passcode: value })
                            }
                            maxLength={6}
                            pattern={REGEXP_ONLY_DIGITS}
                            className="w-full"
                        >
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSeparator />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSeparator />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                    </div>
                    <Button
                        type="submit"
                        className="w-full rounded-lg bg-primary text-white hover:bg-primary/90 transition"
                    >
                        Submit
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
