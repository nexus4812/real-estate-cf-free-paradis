import { render, screen } from '@testing-library/react';
import { YieldChart } from '../YieldChart';
import { ChartData } from '@/types/chart';
import { vi } from 'vitest';

// ResponsiveContainer のモック
vi.mock('recharts', async (importOriginal) => {
  const actual = await importOriginal() as typeof import('recharts');
  return {
    ...actual,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div style={{ width: '100%', height: '100%' }}>{children}</div>
    ),
  };
});

describe('YieldChart', () => {
  const mockChartData: ChartData[] = [
    {
      data: [
        { year: 1, value: 5 },
        { year: 2, value: 6 },
      ],
      title: '表面利回り',
      unit: '%',
      color: '#8884d8',
    },
    {
      data: [
        { year: 1, value: 3 },
        { year: 2, value: 4 },
      ],
      title: '実質利回り',
      unit: '%',
      color: '#82ca9d',
    },
  ];

  it('正常にレンダリングされる', () => {
    render(<YieldChart data={mockChartData} />);
    expect(screen.getByText('利回り推移')).toBeInTheDocument();
  });

  it('loading状態のときにローディング表示がされる', () => {
    render(<YieldChart data={[]} loading={true} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument(); // animate-pulse が適用される要素を想定
  });

  it('データが渡されたときにチャートが描画される', () => {
    render(<YieldChart data={mockChartData} />);
    // Rechartsのコンポーネントがレンダリングされていることを確認
    expect(screen.getByText('年')).toBeInTheDocument(); // XAxisのラベル
    expect(screen.getByText('利回り（%）')).toBeInTheDocument(); // YAxisのラベル
  });

  it('データが空の場合でもレンダリングされる', () => {
    render(<YieldChart data={[]} />);
    expect(screen.getByText('利回り推移')).toBeInTheDocument();
    expect(screen.getByText('年')).toBeInTheDocument();
  });
});
