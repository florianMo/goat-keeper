import { blue, cyan, lime, red } from '@ant-design/colors';
import dayjs from 'dayjs';
import React from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  LineType,
  ReferenceArea,
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
  isFifthSet: boolean;
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
    type: 'stepAfter' as LineType,
    strokeWidth: 3,
    activeDot: { r: 4 },
    dot: false,
  };

  const yDomain = props.isFifthSet ? [0, 15] : [0, 25];
  const yTicks = props.isFifthSet ? [0, 5, 10, 15] : [0, 5, 10, 15, 20, 25];

  const getScoreColor = (d: any): string =>
    d.t1Score > d.t2Score ? lime[1] : d.t1Score < d.t2Score ? red[1] : blue[1];

  const areas = [{ x1: data[0].time, x2: data[1].time, fill: getScoreColor(data[0]) }];
  for (let i = 1; i < data.length - 1; i++) {
    const color = getScoreColor(data[i]);

    if (color !== areas[areas.length - 1].fill) {
      areas[areas.length - 1].x2 = data[i].time;

      const a = {
        x1: data[i].time,
        x2: data[i + 1].time,
        fill: color,
      };

      areas.push(a);
    } else {
      areas[areas.length - 1].x2 = data[i].time;
    }
  }

  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        {areas.map((a, i) => (
          <ReferenceArea key={i} {...a} isFront={false} />
        ))}

        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          name="Temps"
          domain={[t1Data[0].time, t1Data[t1Data.length - 1].time]}
          tickFormatter={(timestamp: number): string => dayjs(timestamp).format(timeFormat)}
          type="number"
        />
        <YAxis domain={yDomain as any} ticks={yTicks} width={32} />
        <Tooltip labelFormatter={(timestamp: number): string => dayjs(timestamp).format(timeFormat)} />

        <Line {...lineProps} dataKey="t1Score" name={props.game.team1.name} stroke={cyan[9]} />
        <Line {...lineProps} dataKey="t2Score" name={props.game.team2.name} stroke={cyan[6]} />
      </LineChart>
    </ResponsiveContainer>
  );
};
