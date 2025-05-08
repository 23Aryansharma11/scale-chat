"use client";
import { Pencil } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "../ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axios from "axios";
import { GROUP_CHAT_URL } from "@/lib/apiEndPoints";
import { clearCache } from "@/actions/common";

const updateChatSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters."),
    passcode: z.string().length(6, "Passcode must be 6 digits."),
});

type UpdateChatFormValues = z.infer<typeof updateChatSchema>;

const UpdateGroupChat = ({
    group,
    token,
}: {
    group: {
        id: string;
        title: string;
        passcode: string;
        created_at: string;
    };
    token: string;
}) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset,
    } = useForm<UpdateChatFormValues>({
        resolver: zodResolver(updateChatSchema),
        defaultValues: {
            title: group.title,
            passcode: group.passcode,
        },
    });

    const onSubmit = async (data: UpdateChatFormValues) => {
        setLoading(true);
        try {
            const res = await axios.put(`${GROUP_CHAT_URL}/${group.id}`, data, {
                headers: {
                    Authorization: token,
                },
            });

            if (res.data?.message) {
                toast.success("Group updated successfully");
                reset();
                clearCache("dashboard");
                setOpen(false);
            }
        } catch (error) {
            toast.error("Failed to update group");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-muted"
                    title="Edit Group"
                >
                    <Pencil className="w-4 h-4 text-gray-600" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <h2 className="text-xl font-semibold text-gray-900">
                        Edit Group Chat
                    </h2>
                    <p className="text-sm text-gray-500">
                        Update the group title and passcode.
                    </p>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <Label>ID</Label>
                        <Input
                            value={group.id}
                            disabled
                            className="cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <Label>Created At</Label>
                        <Input
                            value={new Date(group.created_at).toLocaleString()}
                            disabled
                            className="cursor-not-allowed"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="title">Group Title</Label>
                        <Input
                            id="title"
                            {...register("title")}
                            className="rounded-md"
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
                            value={watch("passcode")}
                            onChange={(val) => setValue("passcode", val)}
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
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Updating..." : "Update Group"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateGroupChat;
