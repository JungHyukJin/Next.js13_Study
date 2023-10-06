import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function DeletePostAPI(req, resp) {
  if (req.method === "DELETE") {
    try {
      const userSession = await getServerSession(req, resp, authOptions);
      const db = (await connectDB).db("forum");
      let checkUser = await db
        .collection("post")
        .findOne({ _id: new ObjectId(req.body) });
      if (userSession && checkUser.author === userSession.user.email) {
        let result = await db
          .collection("post")
          .deleteOne({ _id: new ObjectId(req.body) });
        if (result.deletedCount === 0) {
          console.log("1");
          return resp.status(500).json("삭제실패");
        } else {
          console.log("2");
          return resp.status(200).json("삭제완료");
        }
      } else {
        console.log("3");
        return resp.status(500).json("작성자와 현재 유저 불일치");
      }
    } catch (error) {
      console.log("4");
      resp.status(500).json("삭제실패");
    }
  }
}
