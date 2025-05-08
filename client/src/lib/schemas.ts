import { z } from "zod";

export const LoginPayloadSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters").nonempty(),
    email: z.string().email().nonempty().trim(),
    provider: z.enum(["email", "google", "github", "facebook"]),
    oauth_id: z.string().nonempty(),
    image: z.string().optional(),
});
