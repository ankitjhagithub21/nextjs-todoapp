
import dbConnect from '@/lib/db';
import User from '@/models/User';
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
    
    return NextResponse.json({user});

   
  }catch(error){
    return NextResponse.json({ success: false,message:error.message }, { status: 200 });
  }
}