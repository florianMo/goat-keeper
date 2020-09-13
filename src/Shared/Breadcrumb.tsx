import { grey } from '@ant-design/colors';
import { Button } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { dateFormat, timeFormat } from 'src/components/App';
import { displayName } from 'src/models/game';
import { Urls } from 'src/routing';
import { RootState } from 'src/store/store';
import styled from 'styled-components';

interface BreadcrumbProps {
  id: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = (props: BreadcrumbProps): JSX.Element => {
  const game = useSelector((state: RootState) => state.games.entities[props.id]);
  const history = useHistory();

  return (
    <StyledBreadcrumb>
      <p>
        {displayName(game)}, {dayjs(game.at).format(dateFormat)} {dayjs(game.at).format(timeFormat)} -{' '}
        <Button type="link" onClick={(): void => history.push(Urls.GAME_LIST)}>
          tous les matchs
        </Button>
      </p>
    </StyledBreadcrumb>
  );
};

const StyledBreadcrumb = styled.div`
  p {
    color: ${grey[5]};
    font-size: 12px;
    margin: 0;
  }

  button {
    padding: 0;

    span {
      font-size: 12px;
      font-weight: normal;
    }
  }
`;
