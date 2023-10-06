import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function NewPostAPI(req, resp) {
  // 하기 코드 추가
  const userSession = await getServerSession(req, resp, authOptions);
  if (userSession) {
    req.body.author = userSession.user.email;
  }
  
  // 기존 코드
  if (req.method === "POST") {
    if (req.body.title === "") {
      return resp.status(500).json("제목을 작성해주세요");
    }
    try {
      let db = (await connectDB).db("forum");
      let result = db.collection("post").insertOne(req.body);
      resp.redirect(302, "/list");
    } catch (error) {
      console.log(error);
    }
  }
}
