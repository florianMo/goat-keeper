import { cyan } from '@ant-design/colors';
import { faList, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import volleyball from 'src/assets/images/volleyball.png';
import { Urls } from 'src/routes';
import styled from 'styled-components';

export const Topbar = (): JSX.Element => {
  const history = useHistory();

  return (
    <StyledTopbar>
      <span className="brand" onClick={(): void => history.push(Urls.HOME)}>
        Goat keeper
        <img alt="volleyball" src={volleyball} />
      </span>
      <div className="actions">
        <Tooltip placement="left" title="matchs précédents">
          <FontAwesomeIcon size="2x" icon={faList} onClick={(): void => history.push(Urls.GAME_LIST)} />
        </Tooltip>
        <Tooltip placement="left" title="nouveau match">
          <FontAwesomeIcon size="2x" icon={faPlusCircle} onClick={(): void => history.push(Urls.NEW_GAME)} />
        </Tooltip>
      </div>
    </StyledTopbar>
  );
};

const StyledTopbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  background: linear-gradient(to right, ${cyan[9]}, ${cyan[6]});
  margin-bottom: 32px;

  > span {
    color: white;
  }

  .brand {
    display: flex;
    align-items: center;
    font-family: 'Pacifico';
    margin-left: 24px;
    font-size: 30px;
    cursor: pointer;

    img {
      width: 30px;
      margin-left: 15px;
    }
  }

  .actions svg {
    color: white;
    margin-right: 24px;
    cursor: pointer;
  }
`;
