import React from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
  text-transform: uppercase;
  color: white;
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

const Top = styled.div`
  display: flex;
  flex: 2;
  justify-content: center;
  align-items: end;
`;

const Middle = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Bottom = styled.div`
  display: flex;
  flex: 2;
  justify-content: center;
  align-items: top;
  padding-top: 3rem;
`;

const Label = styled.div`
  font-size: 1.8rem;
  color: #888;
`;

const BigLabel = styled.div`
  font-size: 2.2rem;
  color: #888;
`;

const HugeText = styled.div`
  font-size: 10rem;
`;

const BigText = styled.div`
  font-size: 4rem;
`;

const TotaliserText = props => {
  const { today, yesterday } = useSpring({
    today: props.totals.today,
    yesterday: props.totals.yesterday
  });
  return (
    <Wrapper>
      <FlexWrapper>
        <Top>
          <BigLabel>Today you've raised:</BigLabel>
        </Top>
        <Middle>
          <HugeText>
            <animated.div>
              {today.interpolate(x => `£${x.toFixed(0)}`)}
            </animated.div>
          </HugeText>
        </Middle>
        <Bottom>
          <div>
            <Label>Yesterday's total:</Label>
            <BigText>
              <animated.div>
                {yesterday.interpolate(x => `£${x.toFixed(0)}`)}
              </animated.div>
            </BigText>
          </div>
        </Bottom>
      </FlexWrapper>
    </Wrapper>
  );
};

export default TotaliserText;
