import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function EditPostAPI(req, resp) {
    if(req.method === "POST"){
        console.log('@@@@@@@@@')
        let data = {
            title: req.body.title,
            content: req.body.content,
        };
        const db = (await connectDB).db('forum');
        let result = db.collection('post').updateOne({_id: new ObjectId(req.body._id)}, {$set : data})
        resp.redirect(302, "/list");

    }
}
