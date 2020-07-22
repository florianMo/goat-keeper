/* eslint-disable react/display-name */
import { lime, orange, red, yellow } from '@ant-design/colors';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React from 'react';
import { StatCell } from 'src/components/StatCell';
import { GameEvent, gameEvents, GameEventType, getKey, Player, t } from 'src/models';
import { Game } from 'src/models/game';
import styled from 'styled-components';

interface TeamTableStatsProps {
  game: Game;
}

export const TeamTableStats: React.FC<TeamTableStatsProps> = (props: TeamTableStatsProps): JSX.Element => {
  const allEvents = [
    ...props.game.sets.map((set) => set.events.filter((event) => gameEvents.includes(event.type))),
  ].flat();

  const playerStats = props.game.team1.players.map((player: Player) => {
    const s: any = { key: getKey(player) };

    gameEvents.forEach((eventType) => {
      s[eventType] = allEvents.filter(
        (event) =>
          event.player.name === player.name && event.player.number === player.number && event.type === eventType
      );
    });

    return s;
  });

  const columns: ColumnsType = [
    {
      title: 'Joueur',
      render: (stat: any): string => stat.key.split(':')[0],
      sorter: (a: any, b: any): number => a.key.split(':')[0].localeCompare(b.key.split(':')[0]),
    },
    {
      title: 'Numéro',
      render: (stat: any): string => stat.key.split(':')[1],
      sorter: (a: any, b: any): number =>
        parseInt(a.key.split(':')[1], 10) > parseInt(b.key.split(':')[1], 10) ? 1 : -1,
    },
  ];

  const getStatPercentage = (events: GameEvent[]): number => {
    return +((events.filter((s: GameEvent) => s.positive).length * 100) / events.length).toFixed(0) || 0;
  };

  const getPerformanceClass = (events: GameEvent[]): string => {
    const p = getStatPercentage(events);
    return events.length === 0 ? 'nodata' : p < 25 ? 'xlow' : p < 50 ? 'low' : p < 75 ? 'high' : 'xhigh';
  };

  gameEvents.forEach((eventType) => {
    columns.push({
      title: t(eventType),
      render: (stats: any) => {
        return {
          props: {
            className: getPerformanceClass(stats[eventType]) + (eventType === GameEventType.ACE ? ' nobg' : ''),
          },
          children: (
            <StatCell events={stats[eventType]} type={eventType} percentage={getStatPercentage(stats[eventType])} />
          ),
        };
      },
    });
  });

  return (
    <StyledTeamTableStats>
      <Table dataSource={playerStats} columns={columns} pagination={false} />
    </StyledTeamTableStats>
  );
};

const StyledTeamTableStats = styled.div`
  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td:nth-child(1) {
    font-weight: 700;
  }
  .ant-table-thead > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td,
  .ant-table-tbody > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td,
  .ant-table-thead > tr:hover:not(.ant-table-expanded-row) > td,
  .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td {
    &.xlow {
      background-color: ${red[4]};
    }
    &.low {
      background-color: ${orange[4]};
    }
    &.high {
      background-color: ${yellow[4]};
    }
    &.xhigh {
      background-color: ${lime[4]};
    }
  }
  .xlow {
    background-color: ${red[4]};
  }
  .low {
    background-color: ${orange[4]};
  }
  .high {
    background-color: ${yellow[4]};
  }
  .xhigh {
    background-color: ${lime[4]};
  }

  .nobg {
    background: unset !important;
  }
`;
