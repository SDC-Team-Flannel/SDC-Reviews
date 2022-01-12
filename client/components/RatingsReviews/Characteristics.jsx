import React from 'react';
import styled from 'styled-components';

const Characteristics = ({ data }) => {
  const { characteristics } = data;

  return (
    <Container>
      {Object.keys(characteristics).map((k) => {
        return <Graph key={k} name={k} value={characteristics[k].value} />;
      })}
    </Container>
  );
};

const Graph = ({ name, value }) => {
  value = Math.max(1.08, Math.min(4.92, value));
  return (
    <div>
      <p>{name}</p>
      <Bar>
        <Arrow value={(value - 1) / 4} />
      </Bar>
      <Labels>
        <span>Too Small</span>
        <span>Just Right</span>
        <span>Too Big</span>
      </Labels>
    </div>
  );
};

const Container = styled.div`
  color: ${(props) => props.theme.textDark};
  display: flex;
  flex-direction: column;
  padding: 0px 20px 20px 0px;
  font-size: 0.7em;
`;

const Bar = styled.div`
  positition: relative;
  width: 100%;
  height: 10px;
  background: linear-gradient(
    90deg,
    ${(props) => props.theme.bgDark} 90%,
    ${(props) => props.theme.bgLight} 90%
  );
  background-repeat: repeat-x;
  background-size: 35%;
`;

const Labels = styled.div`
  display: flex;
  margin-top: 4px;
  justify-content: space-around;
  font-size: 0.6em;
  color: ${(props) => props.theme.textLight};
  width: 100%;
`;

const Arrow = styled.div`
  position: relative;
  height: 0px;
  left: calc(${(props) => Math.floor(100 * props.value)}% - 6px);
  width: 0px;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 12px solid ${(props) => props.theme.graph};
`;

export default Characteristics;
