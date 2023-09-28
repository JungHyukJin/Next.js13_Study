"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function Control() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  const deleteHandler = () => {
    const options = { method: "DELETE" };
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, options)
      .then((resp) => resp.json())
      .then((result) => {
        router.push("/");
        router.refresh();
      });
  };
  return (
    <>
      <div>
        <Link href="/create">Create</Link>
      </div>
      {/* id가 있을 때만 보여주기 */}
      {id ? (
        <>
          <div>
            <Link href={`/update/${id}`}>Update</Link>
          </div>
          <button type="button" value="delete" onClick={deleteHandler}>
            Delete
          </button>
        </>
      ) : null}
    </>
  );
}
