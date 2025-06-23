import { GithubOutlined, TwitterOutlined } from "@ant-design/icons";
function Footer() {


  return (
    <>
      <div className="footer">
        <p>All Rights Reversed.</p>
        <div className="social-icons">
          <a href="#"><TwitterOutlined /></a>
          <a href="#"><GithubOutlined /></a>
        </div>
      </div>

    </>
  )
}

export default Footer;
