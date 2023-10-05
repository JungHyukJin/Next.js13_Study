import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function EditPage(props) {
  const db = (await connectDB).db("forum");
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });

  return (
    <>
      <h4>글 수정</h4>
      <form action="/api/post/edit" method="POST">
        <input name="_id" defaultValue={result._id.toString()} style={{display:'none'}} />
        <input name="title" placeholder="title" defaultValue={result.title} />
        <input
          name="content"
          placeholder="content"
          defaultValue={result.content}
        />
        <button type="submit">수정 완료</button>
      </form>
    </>
  );
}
