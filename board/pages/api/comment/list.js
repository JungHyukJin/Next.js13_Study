import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function CommentListAPI(req, resp) {
  const db = (await connectDB).db("forum");
  let result = await db.collection("comment").find({ parent: new ObjectId(req.query.id) }).toArray();
  resp.status(200).json(result);
}
