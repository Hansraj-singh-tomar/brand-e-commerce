import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../styles/Button";
import heroImg from "../../assets/images/hero2.png"
import { useLocation } from 'react-router-dom';

const HeroSection = ({ myData }) => {
  const {name}  = myData;
  const location = useLocation();

  return (
    <Wrapper>
      <div className="container">
        <div className="grid grid-two-column">
          <div className="hero-section-data">
            {
              location.pathname === "/about" ? 
              (
                <>

                <p className="intro-data">Hii i am </p> 
                <h1> {name} </h1>
                <p>
                  Highly skilled React.js developer with building modern web applications. Solid understanding of front-end development principles, proficient in JavaScript, and experienced in utilizing React.js libraries and frameworks. A motivated and adaptable team player with
                  excellent problem-solving skills and a passion for creating user-friendly interfaces.
                </p>
                </>
              )
              :
              ( 
                <>
                  <p className="intro-data" style={{color: "black"}}>Welcome to </p>
                  <h1> {name} </h1>
                  <p>
                     Discover the latest trends and shop fashionable clothing, shoes, and accessories for men and women. 
                  </p>
                </>
              )
            }
            <NavLink to={"/products"}>
              <Button>show now</Button>
            </NavLink>
          </div>
          {/* our homepage image  */}
          <div className="hero-section-image">
            <figure>
              <img
                src={heroImg}
                alt="herosectionphoto"
                className="img-style"
              />
            </figure>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 12rem 0;
  img {
    min-width: 10rem;
    height: 10rem;
  }
  .hero-section-data {
    p {
      margin: 2rem 0;
    }
    h1 {
      text-transform: capitalize;
      font-weight: bold;
    }
    .intro-data {
      margin-bottom: 0;
      color: rgb(13,110,253);
    }
  }
  .hero-section-image {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  figure {
    position: relative;
    &::after {
      content: "";
      width: 60%;
      height: 80%;
      background-color: rgba(81, 56, 238, 0.4);
      position: absolute;
      left: 50%;
      top: -5rem;
      z-index: -1;
    }
  }
  .img-style {
    width: 100%;
    height: auto;
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid {
      gap: 10rem;
    }
    figure::after {
      content: "";
      width: 50%;
      height: 100%;
      left: 0;
      top: 10%;
      /* bottom: 10%; */
      background-color: rgba(81, 56, 238, 0.4);
    }
  }
`;

export default HeroSection;
