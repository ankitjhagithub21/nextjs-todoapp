import dbConnect from '@/lib/db';
import { verifyToken } from '@/lib/verifyToken';
import Todo from '@/models/Todo';
import { NextResponse } from 'next/server';

dbConnect()

export async function GET(req) {
  const {valid,decoded,error} = verifyToken(req);

  if (!valid) {
    return NextResponse.json({ success: false, message: error }, { status: 401 });
  }


  try{
    
    const todos = await Todo.find({ userId: decoded.id });

    return NextResponse.json({ success: true, todos }, { status: 200 });

    
  }catch(error){
    return NextResponse.json({ success: false,message:error.message }, { status: 500 });
  }
}