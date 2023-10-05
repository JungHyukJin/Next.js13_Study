import { connectDB } from "@/util/database";

export default async function NewPostAPI(req, resp) {
  if (req.method === "POST") {
    if (req.body.title === "") {
      return resp.status(500).json("제목을 작성해주세요");
    }
    try{
        let db = (await connectDB).db("forum");
        let result = db.collection("post").insertOne(req.body);
        resp.redirect(302, "/list");
    } catch(error){
        console.log(error)
    }
  }
}
