import Link from "next/link";
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import LogoutBtn from "./LogoutBtn";
import LoginBtn from "./LoginBtn";
import DarkMode from "./DarkMode";
import { cookies } from 'next/headers'

export const metadata = {
  title: "OnlineBoard",
  description: "online board",
};

export default async function RootLayout({ children }) {
  const userInfo = await getServerSession(authOptions); //서버컴포넌트, 서버기능안에서 사용 가능한 함수
  let themeMode = cookies().get('mode');
  // console.log('themeMode', themeMode.value)
  
  return (
    <html>
      <body className={
        themeMode != undefined && themeMode.value == 'dark' 
          ? 'dark-mode'
          : ''
      }>
        <div className="navbar">
          <Link href="/" className="logo">
            ForumLogo
          </Link>
          <Link href="/list">List</Link>
          <Link href="/write">Write</Link>
          {userInfo ? <LogoutBtn /> : <LoginBtn /> }
          <DarkMode />
        </div>
        {children}
      </body>
    </html>
  );
}
