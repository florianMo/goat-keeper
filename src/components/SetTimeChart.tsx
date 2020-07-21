import dayjs from 'dayjs';
import React from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
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

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          name="Temps"
          domain={[t1Data[0].time, t1Data[t1Data.length - 1].time]}
          tickFormatter={(unixTime): string => dayjs(unixTime).format(timeFormat)}
          type="number"
        />
        <YAxis />
        <Tooltip labelFormatter={(timestamp): string => dayjs(timestamp).format(timeFormat)} />
        <Legend />
        <Line
          type="monotone"
          dataKey="t1Score"
          name={props.game.team1.name}
          strokeWidth={4}
          stroke="#8884d8"
          activeDot={{ r: 8 }}
          legendType="circle"
        />
        <Line
          type="monotone"
          dataKey="t2Score"
          name={props.game.team2.name}
          strokeWidth={4}
          stroke="#82ca9d"
          activeDot={{ r: 8 }}
          legendType="circle"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
