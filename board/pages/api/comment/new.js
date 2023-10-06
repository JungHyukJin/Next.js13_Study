import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function NewCommentAPI(req, resp) {
  const userSession = await getServerSession(req, resp, authOptions);
  console.log('@@@@@@@@@ userSession @@@@@@@@@@@', userSession)

  if (!userSession) { return } // 로그인 아닐 시 처리
  
  if (req.method === "POST") {
    let parseData = JSON.parse(req.body);
    let commentData = {
      content: parseData.comment,
      parent: new ObjectId(parseData._id),
      author: userSession.user.email,
    };
    const db = (await connectDB).db("forum");
    let result = await db.collection("comment").insertOne(commentData);
    resp.status(200).json("저장완료");
  }
}
