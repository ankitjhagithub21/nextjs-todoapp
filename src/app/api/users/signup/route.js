import dbConnect from '@/lib/db';
import generateToken from '@/lib/generateToken';
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

        // Generate the JWT token
        const token = generateToken(newUser._id);

        // Create a new response with the success message
        const response = NextResponse.json({ success: true, message: "Account created." }, { status: 201 });

        // Set the token as a cookie in the response
        response.cookies.set('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 60 * 60 * 24 * 1,

        });

        return response;

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}