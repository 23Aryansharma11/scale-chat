import { z } from "zod";


export const createChatSchema = z.object({
    title: z.string().min(1, "Group title is required"),
    passcode: z.string().length(6, "Passcode must be 6 digits"),
});
