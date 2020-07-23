import { cyan } from '@ant-design/colors';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faList, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from 'antd';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Urls } from 'src/routing';
import styled from 'styled-components';

export const Topbar = (): JSX.Element => {
  const history = useHistory();

  return (
    <StyledTopbar>
      <span className="brand" onClick={(): void => history.push(Urls.HOME)}>
        Goat keeper
      </span>
      <div className="actions">
        <Tooltip placement="left" title="matchs précédents">
          <FontAwesomeIcon size="lg" icon={faList} onClick={(): void => history.push(Urls.GAME_LIST)} />
        </Tooltip>
        <Tooltip placement="left" title="nouveau match">
          <FontAwesomeIcon size="lg" icon={faPlusCircle} onClick={(): void => history.push(Urls.NEW_GAME)} />
        </Tooltip>
        <Link to={{ pathname: 'https://github.com/florianMo/goat-keeper' }} target="_blank">
          <FontAwesomeIcon size="lg" icon={faGithub} />
        </Link>
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
  margin-bottom: 16px;

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
    transition: 0.3s ease-in-out;

    &:hover {
      color: ${cyan[8]};
    }
  }
`;
