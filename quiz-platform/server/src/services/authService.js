import bcrypt from "bcrypt";
import prisma from "../config/prisma.js";

export async function register(data) {

    const { username, email, password, role } = data;

    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword,
            role
        }
    });

    return {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
    };
}