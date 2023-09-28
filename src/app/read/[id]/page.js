export default async function page(props) {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${props.params.id}`, {cache: 'no-store'});
  const topic = await resp.json();
  return (
    <>
        <h2>Read</h2>
        <p>topic : {topic.title} </p>
        <p>body : {topic.content}</p>
    </>
  )
}
