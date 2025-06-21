import { render, screen } from '@testing-library/react';
import { CashFlowChart } from '../CashFlowChart';
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

describe('CashFlowChart', () => {
  const mockChartData: ChartData[] = [
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

  it('正常にレンダリングされる', () => {
    render(<CashFlowChart data={mockChartData} />);
    expect(screen.getByText('キャッシュフロー推移')).toBeInTheDocument();
  });

  it('loading状態のときにローディング表示がされる', () => {
    render(<CashFlowChart data={[]} loading={true} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument(); // animate-pulse が適用される要素を想定
  });

  it('データが渡されたときにチャートが描画される', () => {
    render(<CashFlowChart data={mockChartData} />);
    // Rechartsのコンポーネントがレンダリングされていることを確認
    // 具体的な要素のテキストやaria-labelなどで確認するのが良い
    expect(screen.getByText('年')).toBeInTheDocument(); // XAxisのラベル
    expect(screen.getByText('金額（万円）')).toBeInTheDocument(); // YAxisのラベル
  });

  it('データが空の場合でもレンダリングされる', () => {
    render(<CashFlowChart data={[]} />);
    expect(screen.getByText('キャッシュフロー推移')).toBeInTheDocument();
    expect(screen.getByText('年')).toBeInTheDocument();
  });
});
