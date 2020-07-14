import { ResponsiveLine } from '@nivo/line';
import dayjs from 'dayjs';
import React from 'react';
import { Game, GameEventType, GameSet } from 'src/models';

interface SetTimeChartProps {
  game: Game;
  set: GameSet;
}

export const SetTimeChart: React.FC<SetTimeChartProps> = (props: SetTimeChartProps) => {
  const commonProperties = {
    height: 400,
    margin: { top: 20, right: 20, bottom: 20, left: 20 },
    animate: true,
    enableSlices: 'x',
  };

  return (
    <ResponsiveLine
      {...commonProperties}
      data={[
        {
          id: props.game.team1.name,
          data: props.set.events
            .filter((e) => e.type === GameEventType.T1_SCORE_UPDATE)
            .map((e) => {
              return { x: dayjs(e.at).format('HH:mm:ss'), y: e.value };
            }),
        },
        {
          id: props.game.team2.name,
          data: props.set.events
            .filter((e) => e.type === GameEventType.T2_SCORE_UPDATE)
            .map((e) => {
              return { x: dayjs(e.at).format('HH:mm:ss'), y: e.value };
            }),
        },
      ]}
      xScale={{
        type: 'time',
        format: '%H:%m:%s',
        useUTC: false,
        precision: 'millisecond',
      }}
      xFormat="time:%H:%m:%s"
      yScale={{ type: 'linear' }}
      axisLeft={{ tickValues: 5, tickSize: 8 }}
      axisBottom={{
        format: '%b %d',
        tickValues: 'every 5 minute',
      }}
      enablePointLabel={true}
      pointSize={8}
      pointBorderWidth={1}
      pointBorderColor={{
        from: 'color',
        modifiers: [['darker', 0.3]],
      }}
      useMesh={true}
      enableSlices={false}
    />
  );
};
