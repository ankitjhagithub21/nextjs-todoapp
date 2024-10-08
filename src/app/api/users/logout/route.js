import dbConnect from '@/lib/db';
import { NextResponse } from 'next/server';

dbConnect();

export async function GET() {
    try {

   

      const response =   NextResponse.json({ success: true, message:"Logout Successfull." }, { status: 200 });
      
      response.cookies.set('token','',{
        httpOnly:true,
        secure:true,
        sameSite:"none",
        expires:Date.now()
      })

      return response;



    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
