import dbConnect from '@/lib/db';
import { verifyToken } from '@/lib/verifyToken';
import User from '@/models/User';
import { NextResponse } from 'next/server';

dbConnect();

export async function GET(req) {
    try {

        const { valid, decoded, error } = verifyToken(req);

        if (!valid) {
            return NextResponse.json({ success: false, message: error }, { status: 401 });
        }

        // Find the user by Id
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return NextResponse.json({ success: false, message: "User does not exist." }, { status: 404 });
        }

        return NextResponse.json({ success: true, user }, { status: 200 });



    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
