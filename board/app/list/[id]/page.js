import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import Comment from "./Comment";
import notFound from "./not-found";

export default async function ListDetailPage(props) {
  const db = (await connectDB).db("forum");
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });

    if(result === null){
      return <div>404 | 없는 페이지</div>
      // return notFound();
    }

  return (
    <>
      <div>상세페이지</div>
      <h4>{result.title}</h4>
      <p>{result.content}</p>
      <Comment id={result._id.toString()}/>
    </>
  );
}
