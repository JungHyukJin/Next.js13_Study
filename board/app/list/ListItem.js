"use client";
import Link from "next/link";

export default function ListItem({ result }) {
  const deleteHandler = (_id, event) => {
    fetch("api/post/delete", {
      method: "DELETE",
      body: _id,
    })
      .then((res) => {
        // console.log(res)
        if (res.status === 200) {
          return res.json();
        } else {
          // 서버가 에러코드 전송 시 실행 코드
        }
      })
      .then((res) => {
        // 성공 시 실행 코드
        event.target.parentElement.style.opacity = 0; // 애니메이션 효과 천천히 사라짐
        setTimeout(() => {
          event.target.parentElement.remove(); // 1초 사라짐 애니메이션 효과 후 화면에서 삭제
        }, 1000);
      })
      .catch((error) => {
        // 인터넷문제로 실패 시 실행 코드
        console.log(error);
      });
  };

  return (
    <div className="list-bg">
      {result.map((e, i) => {
        return (
          <div className="list-item" id={e._id.toString()} key={i}>
            <Link prefetch={false} href={`/list/${e._id}`}>
              <h4>{e.title}</h4>
              <p>{e.content}</p>
            </Link>
            <Link href={`/edit/${e._id}`}>수정하기</Link>
            <button
              type="button"
              onClick={(event) => deleteHandler(e._id, event)}
            >
              삭제
            </button>
          </div>
        );
      })}
    </div>
  );
}
