import "./globals.css";

export const metadata = {
  title: "OnlineBoard",
  description: "online board",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        
        {children}
      </body>
    </html>
  );
}
