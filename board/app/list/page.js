import { connectDB } from "@/util/database";
import ListItem from "./ListItem";

// 이 페이지를 보여줄 때 항상 dynamic rendering으로 보여준다
export const dynamic = 'force-dynamic'; 

export default async function ListPage() {
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").find().toArray();

  return <ListItem result={result} />;
}
