import connect from "@/lib/db";
import Note from "@/lib/models/notes";
import User from "@/lib/models/user";
import { ObjectId, parseStringify } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId || !ObjectId.isValid(userId)) {
      return NextResponse.json(parseStringify({ message: "Invalid or missing userId" }), {
        status: 400,
      });
    }

    await connect();

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(parseStringify({ message: "User not found" }), {
        status: 400,
      });
    }

    const notes = await Note.find({ user: new ObjectId(userId) });

    return NextResponse.json(parseStringify(notes), {
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json(
      parseStringify({ message: "Failed to fetch notes", error: error.message }),
      {
        status: 500,
      }
    );
  }
};

export const POST = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    const body = await request.json();
    const { title, content } = body;

    if (!userId || !ObjectId.isValid(userId)) {
      return NextResponse.json(parseStringify({ message: "Invalid or missing userId" }), {
        status: 400,
      });
    }

    if (!title || !content) {
      return NextResponse.json(parseStringify({ message: "Missing title or content" }), {
        status: 400,
      });
    }

    await connect();

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(parseStringify({ message: "User not found" }), {
        status: 400,
      });
    }

    const newNote = new Note({ title, content, user: new ObjectId(userId) });

    await newNote.save();

    return NextResponse.json(parseStringify({ message: "Note created", note: newNote }), {
      status: 201,
    });
  } catch (error: any) {
    return NextResponse.json(
      parseStringify({ message: "Failed to create note", error: error.message }),
      {
        status: 500,
      }
    );
  }
};

export const PATCH = async (request: Request) => {
  try {
    const body = await request.json();
    const { noteId, title, content } = body;

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!noteId || !ObjectId.isValid(noteId)) {
      return NextResponse.json(parseStringify({ message: "Invalid or missing noteId" }), {
        status: 400,
      });
    }

    if (!userId || !ObjectId.isValid(userId)) {
      return NextResponse.json(parseStringify({ message: "Invalid or missing userId" }), {
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

    const updatedNote = await Note.findByIdAndUpdate(noteId, { title, content }, { new: true });

    return NextResponse.json(parseStringify({ message: "Note updated", note: updatedNote }), {
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json(
      parseStringify({ message: "Failed to update note", error: error.message }),
      {
        status: 500,
      }
    );
  }
};

export const DELETE = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const noteId = searchParams.get("noteId");

    if (!noteId || !ObjectId.isValid(noteId)) {
      return NextResponse.json(parseStringify({ message: "Invalid or missing noteId" }), {
        status: 400,
      });
    }

    if (!userId || !ObjectId.isValid(userId)) {
      return NextResponse.json(parseStringify({ message: "Invalid or missing userId" }), {
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
          status: 400,
        }
      );
    }

    const deletedNote = await Note.findByIdAndDelete(noteId);

    return NextResponse.json(parseStringify({ message: "Note deleted", note: deletedNote }), {
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json(
      parseStringify({ message: "Failed to delete note", error: error.message }),
      {
        status: 500,
      }
    );
  }
};
