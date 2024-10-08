import dbConnect from '@/lib/db';
import { verifyToken } from '@/lib/verifyToken';
import Todo from '@/models/Todo';
import { NextRequest, NextResponse } from 'next/server';

dbConnect()

export async function POST(req) {
  const {valid,decoded,error} = verifyToken(req);

  if (!valid) {
    return NextResponse.json({ success: false, message: error }, { status: 401 });
  }

  const {title,description} = await req.json()

  try{

    const newTodo = new Todo({
      title,
      description,
      userId:decoded.id
    })
    await newTodo.save()

    return NextResponse.json({ success: true, todo:newTodo ,message:"Todo added."}, { status: 201 });
    
  }catch(error){
    return NextResponse.json({ success: false,message:error.message }, { status: 500 });
  }
}