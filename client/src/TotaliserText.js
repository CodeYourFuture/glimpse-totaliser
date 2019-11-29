import React from "react";
import styled from "styled-components";
import { useSpring, animated, config } from "react-spring";

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
  font-size: 1.6rem;
  letter-spacing: 0.2rem;
`;

const BigLabel = styled.div`
  font-size: 2.1rem;
  letter-spacing: 0.2rem;
  color: #44006e;
  text-shadow: -1px -1px 0 #fff, -1px 0px 0 #fff, -1px 1px 0 #fff,
    0px -1px 0 #fff, 0px 0px 0 #fff, 0px 1px 0 #fff, 1px -1px 0 #fff,
    1px 0px 0 #fff, 1px 1px 0 #fff;
`;

const HugeText = styled.div`
  font-size: 12rem;
`;

const BigText = styled.div`
  font-size: 6rem;
`;

const TotaliserText = props => {
  const { today, yesterday } = useSpring(
    {
      today: props.totals.today,
      yesterday: props.totals.yesterday
    },
    { config: config.slow }
  );
  return (
    <Wrapper>
      <FlexWrapper>
        <Top>
          <BigLabel>Today we've raised:</BigLabel>
        </Top>
        <Middle>
          <HugeText>
            <animated.div>
              {today.interpolate(x => props.currencySymbol + x.toFixed(0))}
            </animated.div>
          </HugeText>
        </Middle>
        <Bottom>
          <div>
            <Label>Yesterday's total:</Label>
            <BigText>
              <animated.div>
                {yesterday.interpolate(
                  x => props.currencySymbol + x.toFixed(0)
                )}
              </animated.div>
            </BigText>
          </div>
        </Bottom>
      </FlexWrapper>
    </Wrapper>
  );
};

export default TotaliserText;
