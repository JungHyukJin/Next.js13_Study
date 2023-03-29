import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
  // NextJS는 라우터를 따로 설치할 필요가 없음
  const router = useRouter();

  return (
    <>
      <nav>
        <Link href="/">
          <span className="link">HOME</span>
        </Link>
        <Link href="/about">
          <span className="link">ABOUT</span>
        </Link>
      </nav>
        <style jsx global>
          {`
            .link{
                color:red;
            }
            .active{
                color:black;
            }  
          `}
        </style>
    </>
  );
}
