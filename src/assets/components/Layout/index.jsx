import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import { UpCircleOutlined } from "@ant-design/icons";
import "./style.css";
import { useEffect, useState } from "react";
function Layout() {

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", scrollFunc);
    return (() => {
      window.removeEventListener("scroll", scrollFunc);
    });
  }, []);
  const scrollFunc = () => {
    const scrolled = document.documentElement.scrollTop;
    setVisible(scrolled > 20);
  };
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  };
  return (
    <div className="layout">
      <Header />
      <Main />
      <Footer />
      <button
        onClick={handleScrollTop}
        className="scrollTop"
        style={{ display: visible ? "flex" : "none" }}
      >
        <UpCircleOutlined />
      </button>

    </div>
  )
}
export default Layout;
