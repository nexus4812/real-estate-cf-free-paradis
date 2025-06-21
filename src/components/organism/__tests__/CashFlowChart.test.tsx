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
    expect(screen.getByText('チャートを読み込み中...')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument(); // LoadingSpinnerのrole="status"を期待
  });

  it('データが渡されたときにチャートが描画される', () => {
    const mockChartData: ChartData[] = [
      {
        data: [{ year: 2023, value: 100 }],
        title: '年間キャッシュフロー',
        unit: '万円',
        color: '#8884d8',
      },
    ];
    render(<CashFlowChart data={mockChartData} />);
    // チャートのタイトルが表示されていることを確認
    expect(screen.getByText('キャッシュフロー推移')).toBeInTheDocument();
    // Rechartsの内部要素のレンダリングはjsdomでは困難なため、コンテナの存在を確認
    expect(screen.getByTestId('card')).toBeInTheDocument();
  });

  it('データが空の場合でもレンダリングされる', () => {
    render(<CashFlowChart data={[]} />);
    expect(screen.getByText('キャッシュフロー推移')).toBeInTheDocument();
    // データが空の場合でも、チャートのコンテナは表示されることを確認
    expect(screen.getByTestId('card')).toBeInTheDocument();
  });
});
