import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function DeletePostAPI(req, resp) {
  if (req.method === "DELETE") {
    try {
      const db = (await connectDB).db("forum");
      let result = await db.collection("post").deleteOne({ _id: new ObjectId(req.body) });
      if (result.deletedCount === 0) {
        resp.status(500).json("삭제실패");
      }
      resp.status(200).json("삭제완료");
    } catch (error) {
      resp.status(500).json("삭제실패");
    }
  }
}
