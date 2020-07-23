import { cyan } from '@ant-design/colors';
import React from 'react';
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, Tooltip } from 'recharts';
import { GameEvent, gameEvents, GameEventType, readable } from 'src/models';

interface PlayerRadarProps {
  playerStats: any;
}

export const PlayerRadar: React.FC<PlayerRadarProps> = (props: PlayerRadarProps): JSX.Element => {
  const playerName = props.playerStats.key.split(':')[0];

  const getStatPercentage = (events: GameEvent[]): number => {
    return +((events.filter((s: GameEvent) => s.positive).length * 100) / events.length).toFixed(0) || 0;
  };

  const data = gameEvents
    .filter((event) => event !== GameEventType.ACE)
    .map((event) => {
      return { event: readable(event, true), value: getStatPercentage(props.playerStats[event]) };
    });

  return (
    <RadarChart outerRadius={90} width={280} height={300} data={data} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
      <text fontSize="18" x="50%" y="20" dominantBaseline="middle" textAnchor="middle">
        {playerName}
      </text>
      <PolarGrid />
      <PolarAngleAxis dataKey="event" />
      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
      <Radar name={playerName} dataKey="value" stroke={cyan[7]} fill={cyan[6]} fillOpacity={0.6} />
      <Tooltip formatter={(value: number, name: string, props: any): string => value + '%'} />
    </RadarChart>
  );
};
