import { NextResponse } from "next/server";
import connect from "@/lib/db";
import User from "@/lib/models/user";
import { ObjectId, parseStringify } from "@/lib/utils";
import { Types } from "mongoose";

export const GET = async () => {
  try {
    await connect();
    const users = await User.find({});
    return NextResponse.json(parseStringify(users), { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to fetch users " + error, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    await connect();
    const newUser = new User(body);
    await newUser.save();

    return NextResponse.json(parseStringify({ message: "User is created", user: newUser }), {
      status: 201,
    });
  } catch (error: any) {
    return NextResponse.json(
      parseStringify({ message: "Failed to create new user", error: error.message }),
      {
        status: 500,
      }
    );
  }
};

export const PATCH = async (req: Request) => {
  try {
    const body = await req.json();

    const { userId } = body;

    await connect();

    if (!userId) {
      return NextResponse.json(parseStringify({ message: "ID is required" }), {
        status: 400,
      });
    }

    if (!Types.ObjectId.isValid(userId)) {
      return NextResponse.json(parseStringify({ message: "Invalid userId" }), {
        status: 400,
      });
    }

    const updatedUser = await User.findOneAndUpdate(
      {
        _id: new ObjectId(userId),
      },
      body,
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        parseStringify({ message: "Failed to update user or User not found" }),
        {
          status: 400,
        }
      );
    }
    return NextResponse.json(parseStringify({ message: "User is updated", user: updatedUser }), {
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json(
      parseStringify({ message: "Failed to update user", error: error.message }),
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
    await connect();
    if (!userId) {
      return NextResponse.json(parseStringify({ message: "ID is required" }), {
        status: 400,
      });
    }

    if (!Types.ObjectId.isValid(userId)) {
      return NextResponse.json(parseStringify({ message: "Invalid userId" }), {
        status: 400,
      });
    }

    const deletedUser = await User.findByIdAndDelete({
      _id: new ObjectId(userId),
    });

    if (!deletedUser) {
      return NextResponse.json(
        parseStringify({ message: "Failed to delete user or User not found" }),
        {
          status: 400,
        }
      );
    }
    return NextResponse.json(parseStringify({ message: "User is deleted", user: deletedUser }), {
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json(
      parseStringify({ message: "Failed to delete user", error: error.message }),
      {
        status: 500,
      }
    );
  }
};
