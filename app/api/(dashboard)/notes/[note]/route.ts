import connect from "@/lib/db";
import Note from "@/lib/models/notes";
import User from "@/lib/models/user";
import { ObjectId, parseStringify } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request: Request, context: { params: any }) => {
  const noteId = context.params.note;

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId || !ObjectId.isValid(userId)) {
      return NextResponse.json(parseStringify({ message: "Invalid or missing userId" }), {
        status: 400,
      });
    }

    if (!noteId || !ObjectId.isValid(noteId)) {
      return NextResponse.json(parseStringify({ message: "Invalid or missing noteId" }), {
        status: 400,
      });
    }

    await connect();
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(parseStringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const note = await Note.findOne({ _id: noteId, user: userId });
    if (!note) {
      return NextResponse.json(
        parseStringify({ message: "Note not found or does not belong to the user" }),
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(parseStringify(note), {
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json(
      parseStringify({ message: "Failed to fetch note", error: error.message }),
      {
        status: 500,
      }
    );
  }
};
