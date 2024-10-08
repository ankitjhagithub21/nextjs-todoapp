import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcryptjs from 'bcryptjs';
import { NextResponse} from 'next/server';

dbConnect()

export async function POST(req) {
  try{

    const reqBody = await req.json();
    
    const {email,password} = reqBody;

    const user = await User.findOne({email})

    if(!user){
        return NextResponse.json({ success: false,message:"User not exist."},{status:404});
    }
    

    const validPassword = await bcryptjs.compare(password,user.password)

    if(!validPassword){
        return NextResponse.json({ success: false,message:"Wrong email or password."},{status:400});
    }

     return NextResponse.json({ success: true,message:"Login successfull."},{status:200});

   
  }catch(error){
    return NextResponse.json({ success: false, message:error.message }, { status: 500 });
  }
}