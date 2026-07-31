import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

export async function register(data) {
    const { username, email, password, role } = data;

    if (!username || !email || !password || !role) {
        throw new Error("All fields are required");
    }

    const roles = ["ORGANIZER", "PARTICIPANT"];

    if (!roles.includes(role)) {
        throw new Error("Invalid role");
    }

    if (password.length < 6) {
        throw new Error("Password must contain at least 6 characters");
    }

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

export async function login(data) {

    const { email, password } = data;

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
        throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
        {
            id: user.id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );

    return {
        token,
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    };
}