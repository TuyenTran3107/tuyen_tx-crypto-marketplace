import "./About.css";
function About() {
  return (
    <>
      <div className="about-container">
        <div className="info">
          <h3>The [Company] Story</h3>

          <p>Welcome to AsmrProg, your premier destination for seamless and secure cryptocurrency transactions.
            Our mission is to empower individuals and institutions by providing a platform that combines
            innovation, security, and user-friendly design to meet all your digital asset needs.
            <br />
            At AsmrProg, we envision a world where digital currency is accessible to everyone. We strive to
            bridge the gap between traditional finance and the future of money by offering a platform that
            simplifies cryptocurrency trading while ensuring the highest standards of security and reliability.
          </p>
          <div className="buttons">
            <button>Learn more</button>
            <button>Contact US</button>
          </div>
        </div>
        <div className="image">
          <img src="/src/assets/about.JPG" alt="about" />
        </div>
      </div>

    </>
  )
}

export default About;
