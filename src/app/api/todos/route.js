import { NextResponse } from 'next/server';

export async function GET() {
  try{
    const todos = []
    return NextResponse.json({
      todos
    })
  }catch(error){
    return NextResponse.json({ success: "ok" }, { status: 200 });
  }
}