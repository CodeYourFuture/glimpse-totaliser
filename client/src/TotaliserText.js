import React from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: white;
`;

const Top = styled.div`
  flex: 1;
  font-size: 2rem;
  align-items: end;
`;

const Middle = styled.div`
  flex: 1;
  font-size: 5rem;
  font-family: "monospace";
  color: white;
`;

const Bottom = styled.div`
  flex: 1;
  font-size: 2rem;
`;

const TotaliserText = props => {
  const { today, yesterday } = useSpring({
    today: props.totals.today,
    yesterday: props.totals.yesterday
  });
  return (
    <Wrapper>
      <div>
        <Top>
          <div>Today you've raised:</div>
        </Top>
        <Middle>
          <animated.div>
            {today.interpolate(x => `£${x.toFixed(0)}`)}
          </animated.div>
        </Middle>
        <Bottom>
          <>
            <div>Yesterday's total:</div>
            <animated.div>
              {yesterday.interpolate(x => `£${x.toFixed(0)}`)}
            </animated.div>
          </>
        </Bottom>
      </div>
    </Wrapper>
  );
};

export default TotaliserText;
