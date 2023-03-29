import Footer from "./Footer";
import NavBar from "./NavBar";

export default function App({pageProps, Component}) {
  return (
    <>
        <NavBar />
        <Component {...pageProps} />
        <Footer />
    </>
  )
}
