import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const chartSetting = {
  yAxis: [{ width: 60 }],
  height: 300,
};

const dataset = [
  { year: new Date(1950, 0, 1), anomaly: -0.2 },
  { year: new Date(1960, 0, 1), anomaly: -0.1 },
  { year: new Date(1970, 0, 1), anomaly: 0.0 },
  { year: new Date(1980, 0, 1), anomaly: 0.1 },
  { year: new Date(1990, 0, 1), anomaly: 0.2 },
  { year: new Date(2000, 0, 1), anomaly: 0.3 },
  { year: new Date(2010, 0, 1), anomaly: 0.5 },
  { year: new Date(2020, 0, 1), anomaly: 0.7 },
];

const valueFormatter = (value) => `${value?.toFixed(2)}°`;

export default function BarchartComponent() {
  return (
    <LineChart
      dataset={dataset}
      xAxis={[
        {
          dataKey: 'year',
          scaleType: 'time',
          valueFormatter: (value) => value.getFullYear().toString(),
        },
      ]}
      series={[
        {
          dataKey: 'anomaly',
          label: 'Temperature Anomaly',
          valueFormatter,
          showMark: false,
          color: '#FB8C00', // You can pick any custom color
        },
      ]}
      {...chartSetting}
    />
  );
}
