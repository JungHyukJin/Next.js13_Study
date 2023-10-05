import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "OnlineBoard",
  description: "online board",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <div className="navbar">
          <Link href="/" className="logo">
            ForumLogo
          </Link>
          <Link href="/list">List</Link>
        </div>
        {children}
      </body>
    </html>
  );
}
