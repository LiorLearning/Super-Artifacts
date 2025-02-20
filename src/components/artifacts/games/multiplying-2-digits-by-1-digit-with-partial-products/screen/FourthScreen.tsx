import React from 'react';
import styled from 'styled-components';
import bgImage from '../../../../../assets/3dImage.png';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${bgImage.src});
  background-size: cover;
  background-position: center;
`;

const MultiplicationBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 40px;
  position: relative;
`;

const NumberContainer = styled.div`
  display: flex;
  gap: 10px;
  background: white;
  padding: 5px 15px;
  border-radius: 4px;
`;

const OperatorContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  background: white;
  padding: 5px 15px;
  border-radius: 4px;
`;

const Line = styled.div`
  width: 100%;
  height: 2px;
  background: black;
  margin: 5px 0;
`;

const PartialProductRow = styled.div<{ bgColor: string }>`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 5px 0;

  .numbers {
    display: flex;
    gap: 10px;
    background: ${props => props.bgColor};
    padding: 5px 15px;
    border-radius: 4px;
  }

  .equation {
    background: white;
    padding: 5px 15px;
    border-radius: 4px;
    margin-left: 10px;
  }
`;

const ResultBox = styled.div`
  display: flex;
  gap: 10px;
  background: rgba(255, 255, 255, 0.5);
  padding: 5px 15px;
  border-radius: 4px;
`;

const Number = styled.span`
  font-size: 24px;
  font-weight: bold;
`;

const FourthScreen: React.FC = () => {
  return (
    <Container>
      <MultiplicationBox>
        <NumberContainer>
          <Number>2</Number>
          <Number>3</Number>
        </NumberContainer>

        <OperatorContainer>
          <Number>×</Number>
          <Number>4</Number>
        </OperatorContainer>

        <Line />

        <PartialProductRow bgColor="#D35400"> {/* Orange color */}
          <div className="numbers">
            <Number>?</Number>
            <Number>?</Number>
          </div>
          <div className="equation">3 × 4</div>
        </PartialProductRow>

        <PartialProductRow bgColor="#3498DB"> {/* Blue color */}
          <div className="numbers">
            <Number>?</Number>
            <Number>?</Number>
          </div>
          <div className="equation">20 × 4</div>
        </PartialProductRow>

        <Line />

        <ResultBox>
          <Number>?</Number>
          <Number>?</Number>
        </ResultBox>
      </MultiplicationBox>
    </Container>
  );
};

export default FourthScreen;
