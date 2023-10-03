import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb'

export default async function ListDetailPage(props) {
    const db = (await connectDB).db("forum");
    let result = await db.collection("post").findOne({_id : new ObjectId(props.params.id)});
  return (
    <div>상세페이지</div>
  )
}
