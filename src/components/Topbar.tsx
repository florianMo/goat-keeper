import { cyan } from '@ant-design/colors';
import React from 'react';
import styled from 'styled-components';

const Topbar = (): JSX.Element => {
  return (
    <StyledTopbar>
      <span className="brand">Goat keeper</span>
      <span className="baseline">
        Volleyball stats tracker
        <span role="img" aria-label="volleyball">
          🏐
        </span>
      </span>
    </StyledTopbar>
  );
};

const StyledTopbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  background-color: ${cyan[9]};

  > span {
    color: white;
  }

  .brand {
    font-family: 'Galada';
    margin-left: 12px;
    font-size: 30px;
  }

  .baseline {
    margin-right: 12px;
    font-size: 22px;

    span {
      margin-left: 6px;
    }
  }
`;

export default Topbar;
