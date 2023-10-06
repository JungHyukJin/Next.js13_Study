"use client";
import { useEffect, useState } from "react";

export default function Comment(props) {
  const [comment, setComment] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`/api/comment/list?id=${props.id}`)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      });
  }, [data]);
  return (
    <div>
      <hr></hr>
      <p>댓글 목록</p>
      {data.length > 0
        ? data.map((e, i) => {
            return <p key={i}>{e.content}</p>;
          })
        : "댓글 없음"}
      <input
        value={comment}
        placeholder="comment"
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <button
        onClick={() => {
          fetch("/api/comment/new", {
            method: "POST",
            body: JSON.stringify({ comment: comment, _id: props.id }),
          }).then(() => {
            setComment("");
          });
        }}
      >
        댓글전송
      </button>
    </div>
  );
}
