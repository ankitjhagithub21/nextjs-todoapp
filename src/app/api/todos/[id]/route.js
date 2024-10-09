import dbConnect from '@/lib/db';
import { verifyToken } from '@/lib/verifyToken';
import Todo from '@/models/Todo';
import { NextResponse } from 'next/server';

dbConnect();

export async function DELETE(req, { params }) {
  // Verify the token from the request
  const { valid, decoded, error } = verifyToken(req);

  if (!valid) {
    return NextResponse.json({ success: false, message: error }, { status: 401 });
  }

  // Get the ID from the request URL
  const { id } = params;


  try {
    const todo = await Todo.findById(id);

    if (!todo) {
      return NextResponse.json({ success: false, message: "Todo not found." }, { status: 404 });
    }

    // Check if the user is authorized to delete the todo
    if (todo.userId.toString() !== decoded.id) {
      return NextResponse.json({ success: false, message: "You cannot delete this todo." }, { status: 403 });
    }

    // Delete the todo
    await Todo.deleteOne({ _id: todo._id });

    return NextResponse.json({ success: true, message: "Todo deleted." }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}


export async function PUT(req, { params }) {
  // Verify the token from the request
  const { valid, decoded, error } = verifyToken(req);

  if (!valid) {
    return NextResponse.json({ success: false, message: error }, { status: 401 });
  }

  // Get the ID from the request URL
  const { id } = params;

  const data = await req.json();

  const { title, description } = data;

  try {
    const todo = await Todo.findById(id);

    if (!todo) {
      return NextResponse.json({ success: false, message: "Todo not found." }, { status: 404 });
    }

    // Check if the user is authorized to delete the todo
    if (todo.userId.toString() !== decoded.id) {
      return NextResponse.json({ success: false, message: "You cannot delete this todo." }, { status: 403 });
    }

    if (title) {
      todo.title = title;
    }
    if (description) {
      todo.description = description;
    }

    await todo.save()


    return NextResponse.json({ success: true, message: "Todo updated.", todo }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}