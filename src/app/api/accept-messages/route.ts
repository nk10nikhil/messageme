import { getServerSession } from "next-auth/next";
// import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";

export async function POST(request : Request){
    await dbConnect();

    const session = await getServerSession(authOptions);
    const user = session?.user as User;

    if(!session || !session.user){
        return Response.json(
            {
                success: false,
                message: "Unauthorized"
            },
            {
                status: 401
            }
        )
    }

    const userId = user?._id;
    const { acceptMessages } = await request.json();

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { isAcceptingMessages : acceptMessages },
            { new: true }
        );

        if(!updatedUser){
            return Response.json(
                {
                    success: false,
                    message: "User not found"
                },
                {
                    status: 404
                }
            )
        } 

        return Response.json(
            {
                success: true,
                message: "Messages accepted",
                user: updatedUser
            },
            {
                status: 200
            }
        )
        
    } catch (error) {
        console.error("Error accepting messages", error);
        return Response.json(
            {
                success: false,
                message: "Error accepting messages"
            },
            {
                status: 500
            }
        )
        
    }

}

// For GET request we can use the same function as the POST request but we need to change the method to GET and remove the request parameter from the function signature.
export async function GET(request : Request){
    await dbConnect();

    const session = await getServerSession(authOptions);
    const user = session?.user as User;

    if(!session || !session.user){
        return Response.json(
            {
                success: false,
                message: "Unauthorized"
            },
            {
                status: 401
            }
        )
    }

    const userId = user?._id;

    try {
        const foundUser = await UserModel.findById(userId);

        if(!foundUser){
            return Response.json(
                {
                    success: false,
                    message: "User not found"
                },
                {
                    status: 404
                }
            )
        } 

        return Response.json(
            {
                success: true,
                message: "User found",
                isAccesptingMessages: foundUser.isAcceptingMessages,
                foundUser
            },
            {
                status: 200
            }
        )
        
    } catch (error) {
        console.error("Error getting user", error);
        return Response.json(
            {
                success: false,
                message: "Error getting user"
            },
            {
                status: 500
            }
        )
        
    }

}