import React from "react";
import styled from "styled-components";
import logo from "./assets/logo.svg";
import semi from "./assets/semi.svg";
import snake from "./assets/snake.svg";
import spiral from "./assets/spiral.svg";
import star from "./assets/star.svg";
import zag from "./assets/zag.svg";

const Bg = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background-color: #44006e;
`;

const Logo = styled.img.attrs({ src: logo })`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  margin-left: -2rem;
  width: 4rem;
`;

const Semi = styled.img.attrs({ src: semi })`
  position: absolute;
  left: 5%;
  bottom: 10%;
  width: 7%;
`;

const Snake = styled.img.attrs({ src: snake })`
  position: absolute;
  left: 0;
  top: 10%;
  width: 14%;
`;

const Spiral = styled.img.attrs({ src: spiral })`
  position: absolute;
  right: 6%;
  top: 34%;
  width: 12%;
`;

const Star = styled.img.attrs({ src: star })`
  position: absolute;
  right: 36%;
  top: 0;
  width: 14%;
`;

const Zag = styled.img.attrs({ src: zag })`
  position: absolute;
  right: 18%;
  bottom: 0;
  width: 18%;
`;

const Totaliser = props => {
  return (
    <Bg>
      <Logo />
      <Semi />
      <Snake />
      <Spiral />
      <Star />
      <Zag />
    </Bg>
  );
};

export default Totaliser;
