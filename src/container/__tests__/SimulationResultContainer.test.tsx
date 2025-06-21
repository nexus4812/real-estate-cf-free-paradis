import { render, screen, waitFor } from '@testing-library/react';
import { SimulationResultContainer } from '../SimulationResultContainer';
import { useSimulationStore } from '@/store/useSimulationStore';
import { vi } from 'vitest';

// Zustand store をモック
vi.mock('@/store/useSimulationStore', () => {
  return {
    useSimulationStore: vi.fn(),
  };
});

// Organism コンポーネントをモック
vi.mock('@/components/organism/SimulationResultPanel', () => ({
  SimulationResultPanel: vi.fn(() => <div>Mock SimulationResultPanel</div>),
}));
vi.mock('@/components/organism/CashFlowChart', () => ({
  CashFlowChart: vi.fn(() => <div>Mock CashFlowChart</div>),
}));
vi.mock('@/components/organism/YieldChart', () => ({
  YieldChart: vi.fn(() => <div>Mock YieldChart</div>),
}));
vi.mock('@/components/organism/MetricsDashboard', () => ({
  MetricsDashboard: vi.fn(() => <div>Mock MetricsDashboard</div>),
}));

describe('SimulationResultContainer', () => {
  const mockSimulationResults = {
    annualCashFlow: [],
    annualBalances: [],
    metrics: {
      totalInvestment: 1000,
      initialCashFlow: 10,
      surfaceYield: 5,
      netOperatingIncome: 50,
      cashOnCashReturn: 10,
      debtServiceCoverageRatio: 1.2,
      loanBalance: 900,
      cumulativeCashFlow: 100,
      irr: 0.1,
      npv: 200,
    },
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('ローディング状態のときにローディングスピナーが表示される', () => {
    (useSimulationStore as vi.Mock).mockReturnValue({
      results: null,
      loading: true,
      error: null,
    });
    render(<SimulationResultContainer />);
    expect(screen.getByText('シミュレーション結果を計算中...')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument(); // LoadingSpinnerのrole="status"を期待
  });

  it('エラー状態のときにエラーメッセージが表示される', () => {
    (useSimulationStore as vi.Mock).mockReturnValue({
      results: null,
      loading: false,
      error: 'シミュレーション中にエラーが発生しました。',
    });
    render(<SimulationResultContainer />);
    expect(screen.getByText('シミュレーション中にエラーが発生しました。')).toBeInTheDocument();
  });

  it('結果があるときに各Organismコンポーネントがレンダリングされる', async () => {
    (useSimulationStore as vi.Mock).mockReturnValue({
      results: {
        ...mockSimulationResults,
        annualCashFlow: [{ year: 1, value: 100 }], // モックデータを追加
        annualBalances: [{ year: 1, value: 100 }], // モックデータを追加
      },
      loading: false,
      error: null,
    });
    render(<SimulationResultContainer />);

    await waitFor(() => {
      expect(screen.getByText('Mock SimulationResultPanel')).toBeInTheDocument();
      expect(screen.getByText('Mock CashFlowChart')).toBeInTheDocument();
      expect(screen.getByText('Mock YieldChart')).toBeInTheDocument();
      expect(screen.getByText('Mock MetricsDashboard')).toBeInTheDocument();
    });
  });

  it('結果がない場合は何も表示されない', () => {
    (useSimulationStore as vi.Mock).mockReturnValue({ // resultsがnullの場合を明示的にモック
      results: null,
      loading: false,
      error: null,
    });
    render(<SimulationResultContainer />);
    expect(screen.queryByText('Mock SimulationResultPanel')).not.toBeInTheDocument();
    expect(screen.queryByText('Mock CashFlowChart')).not.toBeInTheDocument();
    expect(screen.queryByText('Mock YieldChart')).not.toBeInTheDocument();
    expect(screen.queryByText('Mock MetricsDashboard')).not.toBeInTheDocument();
    expect(screen.queryByText('シミュレーション結果を計算中...')).not.toBeInTheDocument();
    expect(screen.queryByText('シミュレーション中にエラーが発生しました。')).not.toBeInTheDocument();
  });
