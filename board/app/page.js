import { connectDB } from "@/util/database";

export default async function Home() {
  const client = await connectDB;
  const db = client.db('forum');
  let result = await db.collection('post').find().toArray();
  // 'post' 컬렉션에 있는 모든 데이터(find())를 가져와서 array로 변환
  console.log('result', result)

  return <div>test</div>;
}
