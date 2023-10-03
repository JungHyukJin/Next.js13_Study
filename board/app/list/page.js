import { connectDB } from "@/util/database";
import Link from "next/link";

export default async function ListPage() {
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").find().toArray();
  console.log(result);

  return (
    <div className="list-bg">
      {result.map((e, i) => {
        console.log(e._id)
        return (
            // Link태그는 prefetch 기능이 내장됨.
            // Link태그가 화면에 보이면 자동으로 내부적으로 href 페이지를 미리 로드해준다.
            // 하지만,  모든 Link들을 prefetch할 필요는 없기 때문에(자원낭비), prefetch={false}로 disable이 가능하다.
            // Link방법을 제외하고 다른 방법으로도 페이지를 이동시킬 수 있다. -> Readme.md 참고
          <Link prefetch={false} href={`/list/${e._id}`}>
            <div id={e._id} key={i} className="list-item">
              <h4>{e.title}</h4>
              <p>{e.content}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
