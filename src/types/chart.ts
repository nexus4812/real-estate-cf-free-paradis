export type ChartDataPoint = {
  year: number;
  value: number;
  label?: string;
};

export type ChartData = {
  data: ChartDataPoint[];
  title: string;
  unit: string;
  color: string;
};
