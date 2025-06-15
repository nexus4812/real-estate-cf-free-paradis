import { render, screen } from '@testing-library/react';
import { CashFlowChart } from '../CashFlowChart';
import { Card } from '@/components/atoms/Card';

// rechartsコンポーネントをモック
jest.mock('recharts', () => ({
  LineChart: jest.fn(() => null),
  Line: jest.fn(() => null),
  XAxis: jest.fn(() => null),
  YAxis: jest.fn(() => null),
  CartesianGrid: jest.fn(() => null),
  Tooltip: jest.fn(() => null),
  Legend: jest.fn(() => null),
  ResponsiveContainer: jest.fn(({ children }) => (
    <div data-testid="responsive-container">{children}</div>
  )),
}));

// Cardコンポーネントをモック
jest.mock('@/components/atoms/Card', () => ({
  Card: jest.fn(({ children }) => <div data-testid="card">{children}</div>),
}));

describe('CashFlowChart', () => {
  const mockData = [
    {
      data: [
        { year: 1, value: 100 },
        { year: 2, value: 120 },
      ],
      title: 'キャッシュフロー',
      unit: '万円',
      color: '#2563eb',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('loadingがtrueの場合、ローディング状態が表示される', () => {
    render(<CashFlowChart data={[]} loading={true} />);
    expect(screen.getByTestId('card')).toHaveClass('animate-pulse');
    expect(screen.queryByText('キャッシュフロー推移')).not.toBeInTheDocument();
  });

  it('dataが空の場合、グラフは表示されないがタイトルは表示される', () => {
    render(<CashFlowChart data={[]} />);
    expect(screen.getByText('キャッシュフロー推移')).toBeInTheDocument();
    expect(screen.queryByTestId('responsive-container')).not.toBeInTheDocument(); // data[0]?.data が undefined のため
  });

  it('dataが存在するときにグラフが正しくレンダリングされ、タイトルが表示される', () => {
    const Recharts = require('recharts'); // モックされたrechartsを再取得
    render(<CashFlowChart data={mockData} />);

    expect(screen.getByText('キャッシュフロー推移')).toBeInTheDocument();
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
    expect(Recharts.LineChart).toHaveBeenCalledTimes(1);
    expect(Recharts.Line).toHaveBeenCalledTimes(1);
    expect(Recharts.XAxis).toHaveBeenCalledTimes(1);
    expect(Recharts.YAxis).toHaveBeenCalledTimes(1);
    expect(Recharts.CartesianGrid).toHaveBeenCalledTimes(1);
    expect(Recharts.Tooltip).toHaveBeenCalledTimes(1);
    expect(Recharts.Legend).toHaveBeenCalledTimes(1);

    // LineChartに正しいデータが渡されているか確認
    expect(Recharts.LineChart).toHaveBeenCalledWith(
      expect.objectContaining({
        data: mockData[0].data,
      }),
      {}
    );

    // Lineに正しいプロパティが渡されているか確認
    expect(Recharts.Line).toHaveBeenCalledWith(
      expect.objectContaining({
        dataKey: 'value',
        stroke: mockData[0].color,
        name: mockData[0].title,
      }),
      {}
    );
  });

  it('heightプロパティが正しく適用される', () => {
    render(<CashFlowChart data={mockData} height={500} />);
    const Recharts = require('recharts');
    expect(Recharts.ResponsiveContainer).toHaveBeenCalledWith(
      expect.objectContaining({
        height: 500,
      }),
      {}
    );
  });
});
