import Link from "next/link";
import Control from "./Control";

// metadata는 server component에서만 사용 가능
export const metadata = {
  title: "Next.js 13 Study",
  description: "생활코딩 Next.JS 13 강의 기반",
};

/* 
하기 코드 동작 방식 :
- 서버 컴포넌트는 서버 쪽에서 fetch method가 실행되고, await 기다리고, json으로 변경 후 topic 데이터를 가지고 와서 그 데이터로 글 목록을 동적으로 생성
- 그 후 결과를 서버쪽 .next 폴더에 저장 후 최종적인 정적 결과물만 클라이언트로 전송한다.(js를 제외)
- 이러한 방식의 장점은 : js를 제외하기 때문에 용량이 적다, 빠르다, 서버쪽에서 렌더링이 끝나고 전송하기 때문에 깜빡임 없이 화면에 바로 보여진다.
*/

export default async function RootLayout({ children }) { 
  // const response =  await fetch("http://localhost:9999/posts", {next:{revalidate : 0 }}); // 0초, 즉 캐시 사용 x
  // 캐시를 아예 사용하지 않는 방식은 좋은 방법이 아니기 때문에, 다른 방식을 사용하는 것이 적당하나, 해당 프로젝트는 간단한 내용만 다루기 떄문에 사용 -> next.js docs에 revalidating data, caching data 확인
  // Next.js에서는 기본적으로 fetch를 사용하게 되면 한 번 가져온 정보를 저장해둔다. -> .next 폴더 안에 저장된 정보가 보관되어 있다.
  // 캐시를 잘 사용하면 굉장한 performance를 보여주는 웹을 만들 수 있다.
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, { cache: "no-store" });
  const topics = await response.json()
  return (
    <html>
      <body>
        <h1>
          <Link href="/">WEB</Link>
        </h1>
        <ul>
          {topics.map((topic) => {
            return (
              <li key={topic.id}>
                <Link href={`/read/${topic.id}`}>{topic.title}</Link>
              </li>
            );
          })}
        </ul>
        {children}
        <Control />
      </body>
    </html>
  );
}
