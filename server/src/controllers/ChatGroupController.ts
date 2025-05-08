import { Request, Response } from "express";
import prisma from "../config/db.config.js";

class ChatGroupController {
    static async store(req: Request, res: Response) {
        try {
            const body = req.body;
            const user = req.user;
            await prisma.chatGroup.create({
                data: {
                    title: body.title,
                    passcode: body.passcode,
                    user_id: user.id,
                },
            });

            return res.status(200).json({ message: "Chat group created" });
        } catch (error) {
            return res
                .status(500)
                .json({ message: "Something went wrong.please try again!" });
        }
    }
    static async index(req: Request, res: Response) {
        try {
            const user = req.user;
            const groups = await prisma.chatGroup.findMany({
                where: {
                    user_id: user.id,
                },
                orderBy: {
                    created_at: "desc",
                },
            });
            return res.json({ data: groups, message: "Groups fetched" });
        } catch (error) {
            return res
                .status(500)
                .json({ message: "Something went wrong.please try again!" });
        }
    }
    static async show(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const user = req.user;
            const groups = await prisma.chatGroup.findUnique({
                where: { id },
            });

            return res.json({ data: groups, message: "Chat fetched" });
        } catch (error) {
            return res
                .status(500)
                .json({ message: "Something went wrong.please try again!" });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = req.user;
            const body = req.body;
            const groups = await prisma.chatGroup.update({
                data: {
                    title: body.title,
                    passcode: body.passcode,
                },
                where: {
                    id,
                },
            });

            return res.json({ data: groups, message: "Chat fetched" });
        } catch (error) {
            return res
                .status(500)
                .json({ message: "Something went wrong.please try again!" });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;

            await prisma.chatGroup.delete({
                where: { id },
            });
            return res.json({ message: "Chat deleted" });
        } catch (error) {
            return res
                .status(500)
                .json({ message: "Something went wrong.please try again!" });
        }
    }
}

export default ChatGroupController;
