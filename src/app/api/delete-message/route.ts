import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";


export async function DELETE(request : Request, { params} : { params: { messageid: string } }){
    const messageId = params.messageid;
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


    try {
        const updateResult = await UserModel.updateOne(
            { _id: user._id },
            {
                $pull: {
                    // messages: { _id: new mongoose.Types.ObjectId(messageId) }
                    messages : { _id : messageId}
                }
            }
        )
        if(updateResult.modifiedCount == 0){
            return Response.json(
                {
                    success: false,
                    message: "Message not found"
                },
                {
                    status: 404
                }
            )
        }
        return Response.json(
            {
                success: true,
                message: "Message deleted"
            },
            {
                status: 200
            }
        )

    } catch (error) {
        return Response.json(
            {
                success: false,
                message: "Internal server error"
            },
            {
                status: 500
            }
        )
        
    }

}