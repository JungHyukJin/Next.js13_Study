"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; // next 13버전부터 사용

// update는 create와 read 두 가지 기능의 합이다.
export default function page() {
  const [title, setTitle] = useState("");
  const [content, setContet] = useState("");
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`)
      .then((res) => res.json())
      .then((result) => {
        setTitle(result.title);
        setContet(result.content);
      });
  }, []);
  const submitHandler = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const content = e.target.content.value;
    const options = {
      method: "PATCH", //"PUT", "PATCH" 수정에 사용
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    };
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, options)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const resultID = result.id;
        router.refresh();
        router.push(`/read/${resultID}`);
      });
  };
  return (
    <form onSubmit={submitHandler}>
      <p>
        <input
          type="text"
          placeholder="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </p>
      <p>
        <textarea
          name="content"
          placeholder="content"
          value={content}
          onChange={(e) => setContet(e.target.value)}
        />
      </p>
      <p>
        <input type="submit" value="update" />
      </p>
    </form>
  );
}
