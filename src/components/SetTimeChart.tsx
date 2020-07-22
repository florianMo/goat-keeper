import { cyan } from '@ant-design/colors';
import dayjs from 'dayjs';
import React from 'react';
import {
  CartesianGrid,
  Legend,
  LegendType,
  Line,
  LineChart,
  LineType,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { timeFormat } from 'src/components/App';
import { Game, GameEventType, GameSet } from 'src/models';

interface SetTimeChartProps {
  game: Game;
  set: GameSet;
}

export const SetTimeChart: React.FC<SetTimeChartProps> = (props: SetTimeChartProps) => {
  const t1Data = props.set.events
    .filter((e) => e.type === GameEventType.T1_SCORE_UPDATE)
    .map((e) => {
      return { time: dayjs(e.at).valueOf(), value: e.value };
    });

  const scoreEvents = props.set.events.filter((e) =>
    [GameEventType.T1_SCORE_UPDATE, GameEventType.T2_SCORE_UPDATE].includes(e.type)
  );

  const data = [];
  let t1LastScore = 0;
  let t2LastScore = 0;
  scoreEvents.forEach((e) => {
    t1LastScore = e.type === GameEventType.T1_SCORE_UPDATE ? e.value : t1LastScore;
    t2LastScore = e.type === GameEventType.T2_SCORE_UPDATE ? e.value : t2LastScore;
    data.push({ time: dayjs(e.at).valueOf(), t1Score: t1LastScore, t2Score: t2LastScore });
  });

  const lineProps = {
    type: 'monotone' as LineType,
    strokeWidth: 4,
    activeDot: { r: 8 },
    legendType: 'circle' as LegendType,
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          name="Temps"
          domain={[t1Data[0].time, t1Data[t1Data.length - 1].time]}
          tickFormatter={(timestamp: number): string => dayjs(timestamp).format(timeFormat)}
          type="number"
        />
        <YAxis domain={[0, 25]} ticks={[5, 10, 15, 20, 25]} />
        <Tooltip labelFormatter={(timestamp: number): string => dayjs(timestamp).format(timeFormat)} />
        <Legend />
        <Line {...lineProps} dataKey="t1Score" name={props.game.team1.name} stroke={cyan[9]} />
        <Line {...lineProps} dataKey="t2Score" name={props.game.team2.name} stroke={cyan[6]} />
      </LineChart>
    </ResponsiveContainer>
  );
};
