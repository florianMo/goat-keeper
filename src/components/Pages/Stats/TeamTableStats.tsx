/* eslint-disable react/display-name */
import { lime, orange, red, yellow } from '@ant-design/colors';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React from 'react';
import { StatCell } from 'src/components/Pages/Stats/StatCell';
import { GameEvent, gameEvents, GameEventType, readable } from 'src/models';
import styled from 'styled-components';

interface TeamTableStatsProps {
  playerStats: any;
}

export const TeamTableStats: React.FC<TeamTableStatsProps> = (props: TeamTableStatsProps): JSX.Element => {
  const columns: ColumnsType = [
    {
      title: '#',
      className: 'fit-content',
      render: (stat: any): string => stat.key.split(':')[1],
      sorter: (a: any, b: any): number =>
        parseInt(a.key.split(':')[1], 10) > parseInt(b.key.split(':')[1], 10) ? 1 : -1,
    },
    {
      title: 'Nom',
      render: (stat: any): string => stat.key.split(':')[0],
      sorter: (a: any, b: any): number => a.key.split(':')[0].localeCompare(b.key.split(':')[0]),
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
      title: readable(eventType),
      className: 'fit-content',
      sorter: (a: any, b: any): number =>
        eventType !== GameEventType.ACE
          ? getStatPercentage(a[eventType]) > getStatPercentage(b[eventType])
            ? 1
            : -1
          : a[eventType].length > b[eventType].length
          ? -1
          : 1,
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
      <Table bordered dataSource={props.playerStats} columns={columns} pagination={false} size="small" />
    </StyledTeamTableStats>
  );
};

const border = '8px solid ';
const borderRed = red[4];
const borderOrange = orange[4];
const borderYellow = yellow[4];
const borderLime = lime[4];

const StyledTeamTableStats = styled.div`
  td,
  th {
    padding: 4px 4px !important;
  }

  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td:nth-child(1) {
    font-weight: 700;
  }

  .xlow {
    border-left: ${border} ${borderRed};
  }
  .low {
    border-left: ${border} ${borderOrange};
  }
  .high {
    border-left: ${border} ${borderYellow};
  }
  .xhigh {
    border-left: ${border} ${borderLime};
  }

  .nobg {
    border-left: none;
  }

  .fit-content {
    width: 1%;
    white-space: nowrap;
  }
`;
