"use client";

import { useState } from "react";

export default function WritePage() {
  const [img, setImg] = useState('');
  return (
    <>
      <h4>글 작성</h4>
      <form action="/api/post/new" method="POST">
        <input name="title" placeholder="title" />
        <input name="content" placeholder="content" />
        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            let file = e.target.files[0];
            let encodedFileName = encodeURIComponent(file.name);
            let res = await fetch(`/api/post/image?file=${encodedFileName}`);
            res = await res.json();

            //S3 업로드
            const formData = new FormData();
            Object.entries({ ...res.fields, file }).forEach(([key, value]) => {
              formData.append(key, value);
            });

            let uploadResp = await fetch(res.url, {
              method: "POST",
              body: formData,
            });
            console.log(uploadResp);

            if (uploadResp.ok) {
              setImg(uploadResp.url + "/" + encodedFileName);
            } else {
              console.log("실패");
            }
          }}
        />
        <img src={img} style={{width: '100px'}}/>
        <button type="submit">작성완료</button>
      </form>
    </>
  );
}
