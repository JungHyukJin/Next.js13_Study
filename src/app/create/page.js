'use client'
import React from 'react'

// import { useRouter } from 'next/router'; // next 12버전에서 사용하는 페이지 라우터 -> 에러남
import { useRouter } from 'next/navigation'; // next 13버전부터 사용 (app router)

export default function page() {
  const router = useRouter();
  const submitHandler = (e) => {
    e.preventDefault(); // onSubmit의 기본 동작을 방지한다.(페이지 새로고침)
    const title = e.target.title.value; // name: title 엘리먼트의 value값 
    const content = e.target.content.value; // name: content 엘리먼트의 value값
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title, content})
    }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, options)
    .then(res => res.json())
    .then(result => {
      console.log(result)
      const resultID = result.id;
      router.refresh();
      // 방금 생성한 id의 글로 리다이렉션
      router.push(`/read/${resultID}`)
    });
  };
  return (
    // onSubmit은 서버 컴포넌트에서는 동작하지 않기 때문에, 상단에 'use client'를 작성하여 클라이언트 컴포넌트로 변경해줘야 한다.
    <form onSubmit={submitHandler}>
      <p>
        <input type="text" placeholder="title" name="title"/>
      </p>
      <p>
        <textarea name="content" placeholder="content" />
      </p>
      <p>
        <input type="submit" value="create"/>
      </p>
    </form>
  )
}
