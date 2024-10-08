import dbConnect from '@/lib/db';
import generateToken from '@/lib/generateToken';
import User from '@/models/User';
import bcryptjs from 'bcryptjs';
import { NextResponse } from 'next/server';

dbConnect();

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ success: false, message: "User does not exist." }, { status: 404 });
    }

    // Validate password
    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json({ success: false, message: "Wrong email or password." }, { status: 400 });
    }

    // Generate the JWT token
    const token = generateToken(user._id);

    // Create a new response with the success message
    const response = NextResponse.json({ success: true, message: "Login successful." }, { status: 200 });

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
