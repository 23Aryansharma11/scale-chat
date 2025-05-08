import { Request, Response } from "express";
import prisma from "../config/db.config.js";

interface GroupUserType {
    name: string;
    group_id: string;
}

class ChatGroupUserController {
    static async index(req: Request, res: Response) {
        try {
            const { group_id } = req.query;
            const users = await prisma.groupUsers.findMany({
                where: { group_id: group_id as string },
            });

            return res.json({
                message: "Data fetched",
                data: users,
            });
        } catch (error) {
            return res.status(500).json({
                message: "Something went wrong",
            });
        }
    }

    static async store(req: Request, res: Response) {
        try {
            const body: GroupUserType = req.body;
            const data = await prisma.groupUsers.create({ data: body });
            return res.json({
                message: "User added successfully",
                data,
            });
        } catch (error) {
            return res.status(500).json({
                message: "Something went wrong",
            });
        }
    }
}

export default ChatGroupUserController;
