import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcryptjs from 'bcryptjs';
import { NextResponse } from 'next/server';

dbConnect()

export async function POST(req) {
    try {

        const reqBody = await req.json();

        const { email, password } = reqBody;

        const user = await User.findOne({ email })

        if (user) {
            return NextResponse.json({ success: false, message: "Please login." }, { status: 400 });
        }


        const hashedPassword = await bcryptjs.hash(password, 12)


        const newUser = new User({
            email,
            password: hashedPassword
        })

        await newUser.save()


        return NextResponse.json({ success: true, message: "Account created." }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}