export default function WritePage() {
  return (
    <>
        <h4>글 작성</h4>
        <form action="/api/post/new" method="POST">
            <input name='title' placeholder="title" />
            <input name='content' placeholder="content" />
            <button type="submit">작성완료</button>
        </form>
    </>
  )
}
