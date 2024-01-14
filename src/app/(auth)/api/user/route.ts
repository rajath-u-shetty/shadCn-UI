import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { z } from "zod";


const userSchema = z.object({
    username: z.string().min(1, "username is required").max(30),
    email: z.string().min(1, "Email is Required").email(),
    password: z.string()
        .min(1, "Password is Required")
        .min(8, "Password must have 8 characters"),
  })
  

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, username, password} = userSchema.parse(body);

        const existingUserBymail = await db.user.findUnique({
            where: { email: email}
        });
        if(existingUserBymail){
            return NextResponse.json({ user: null, message: "user with this Email already exists"}, { status: 409 })
        }

        const existingUserByUsername = await db.user.findUnique({
            where: {username: username}
        })
        if(existingUserByUsername){
            return NextResponse.json({ user: null, message: "user witht he username already exists"}, { status: 409 })
        }

        const hashedPassword = await hash(password, 10);

        const newUser = await db.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            }
        })

        const { password: newUserPassword, ...rest} = newUser;

        return NextResponse.json({ user: rest, message: "new User created successfully"}, { status: 409 });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong"}, { status: 500 });
    }
}