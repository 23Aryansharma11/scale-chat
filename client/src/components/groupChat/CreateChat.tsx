"use client";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "../ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createChatSchema } from "@/validations/chatValidations";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import { GROUP_CHAT_URL } from "@/lib/apiEndPoints";
import { clearCache } from "@/actions/common";

// Schema
type CreateChatFormValues = z.infer<typeof createChatSchema>;

const CreateChat = ({ user }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false); // Track loading state

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset,
    } = useForm<CreateChatFormValues>({
        resolver: zodResolver(createChatSchema),
        defaultValues: {
            title: "",
            passcode: "",
        },
    });

    const onSubmit = async (payload: CreateChatFormValues) => {
        setLoading(true); // Set loading state to true
        try {
            const { data } = await axios.post(
                GROUP_CHAT_URL,
                {
                    ...payload,
                    user_id: user.id,
                },
                {
                    headers: {
                        Authorization: user.token,
                    },
                }
            );
            if (data?.message) {
                setLoading(false);
                reset();
                clearCache("dashboard");
                toast.success(data?.message);
                setOpen(false);
            }
        } catch (error) {
            toast.error("Failed to create chat group. Please try again.");
            if (error instanceof AxiosError) {
                toast.error(error.message);
            } else {
                toast.error("Failed to create chat group. Please try again.");
            }
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    const passcode = watch("passcode");

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="rounded-lg px-5 py-2 text-sm font-semibold w-max">
                    Create Chat Group
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <h2 className="text-xl font-semibold text-gray-900">
                        Create Chat Group
                    </h2>
                    <p className="text-sm text-gray-500">
                        Enter group title and a secure 6-digit passcode.
                    </p>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title">Group Title</Label>
                        <Input
                            id="title"
                            placeholder="Enter group name"
                            {...register("title")}
                            className="rounded-md border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                        {errors.title && (
                            <p className="text-sm text-red-500">
                                {errors.title.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2 w-full">
                        <Label htmlFor="passcode">6-Digit Passcode</Label>
                        <InputOTP
                            id="passcode"
                            value={passcode}
                            onChange={(value) => setValue("passcode", value)}
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
                        {errors.passcode && (
                            <p className="text-sm text-red-500">
                                {errors.passcode.message}
                            </p>
                        )}
                    </div>
                    <Button
                        type="submit"
                        className="w-full rounded-lg bg-primary text-white hover:bg-primary/90 transition"
                        disabled={loading} // Disable the button when loading
                    >
                        {loading ? (
                            <span>Loading...</span> // You can use a spinner here too
                        ) : (
                            "Create Group"
                        )}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateChat;
