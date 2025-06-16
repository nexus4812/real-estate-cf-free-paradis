import { render, screen } from '@testing-library/react';
import { SimulationResultPanel } from '../SimulationResultPanel';
import { LoadingSpinner } from '@/components/molecules/LoadingSpinner';
import { ErrorMessage } from '@/components/molecules/ErrorMessage';
import { ResultSummary } from '@/components/molecules/ResultSummary';
import { MetricCard } from '@/components/molecules/MetricCard';
import { Card } from '@/components/atoms/Card';

// Moleculeコンポーネントをモック
vi.mock('@/components/molecules/LoadingSpinner', () => ({
  LoadingSpinner: vi.fn(({ message }) => <div data-testid="loading-spinner">{message}</div>),
}));
vi.mock('@/components/molecules/ErrorMessage', () => ({
  ErrorMessage: vi.fn(({ message }) => <div data-testid="error-message">{message}</div>),
}));
vi.mock('@/components/molecules/ResultSummary', () => ({
  ResultSummary: vi.fn(({ totalPayment, initialIncome, cashFlow, yield: yieldValue }) => (
    <div data-testid="result-summary">
      Summary: {totalPayment}, {initialIncome}, {cashFlow}, {yieldValue}
    </div>
  )),
}));
vi.mock('@/components/molecules/MetricCard', () => ({
  MetricCard: vi.fn(({ title, value, unit }) => (
    <div data-testid="metric-card">
      {title}: {value} {unit}
    </div>
  )),
}));
vi.mock('@/components/atoms/Card', () => ({
  Card: vi.fn(({ children }) => <div data-testid="card">{children}</div>),
}));

describe('SimulationResultPanel', () => {
  const mockResults = {
    totalPaymentAmount: 1000,
    initialAnnualIncome: 200,
    annualBalances: [{ year: 1, value: 100 }, { year: 2, value: 110 }],
    grossYields: [{ year: 1, value: 5 }, { year: 2, value: 5.1 }],
    realYields: [{ year: 1, value: 4 }, { year: 2, value: 4.1 }],
    preTaxCashFlows: [{ year: 1, value: 80 }, { year: 2, value: 85 }],
    taxableIncomes: [{ year: 1, value: 70 }, { year: 2, value: 75 }],
    finalAssetValue: 10000,
    metrics: {
      initialInvestment: 500,
      totalIncome: 1000,
      totalExpense: 500,
      netProfit: 500,
      cashFlow: 100,
      yield: 10,
      roi: 20,
      irr: 15,
      npv: 300,
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('loadingがtrueの場合、LoadingSpinnerが表示される', () => {
    render(<SimulationResultPanel results={null} loading={true} error={null} />);
    expect(screen.getByTestId('loading-spinner')).toHaveTextContent('シミュレーション結果を計算中...');
    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
    expect(screen.queryByTestId('result-summary')).not.toBeInTheDocument();
  });

  it('errorが存在するときにErrorMessageが表示される', () => {
    render(<SimulationResultPanel results={null} loading={false} error="エラーが発生しました" />);
    expect(screen.getByTestId('error-message')).toHaveTextContent('エラーが発生しました');
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    expect(screen.queryByTestId('result-summary')).not.toBeInTheDocument();
  });

  it('resultsがnullの場合にメッセージが表示される', () => {
    render(<SimulationResultPanel results={null} loading={false} error={null} />);
    expect(screen.getByText('シミュレーションを実行すると、ここに結果が表示されます。')).toBeInTheDocument();
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
    expect(screen.queryByTestId('result-summary')).not.toBeInTheDocument();
  });

  it('resultsが存在するときにResultSummaryとMetricCardが表示される', () => {
    render(<SimulationResultPanel results={mockResults} loading={false} error={null} />);
    expect(screen.getByTestId('result-summary')).toBeInTheDocument();
    expect(screen.getByTestId('result-summary')).toHaveTextContent(`Summary: ${mockResults.totalPaymentAmount}, ${mockResults.initialAnnualIncome}, ${mockResults.metrics.cashFlow}, ${mockResults.metrics.yield}`);

    expect(screen.getByText('詳細指標')).toBeInTheDocument();
    expect(screen.getAllByTestId('metric-card')).toHaveLength(9); // 9つのMetricCardがレンダリングされることを確認
    expect(screen.getByText('初期投資額: 500 万円')).toBeInTheDocument();
    expect(screen.getByText('総収入: 1000 万円')).toBeInTheDocument();
    expect(screen.getByText('総費用: 500 万円')).toBeInTheDocument();
    expect(screen.getByText('純利益: 500 万円')).toBeInTheDocument();
    expect(screen.getByText('キャッシュフロー: 100 万円')).toBeInTheDocument();
    expect(screen.getByText('利回り: 10 %')).toBeInTheDocument();
    expect(screen.getByText('ROI: 20 %')).toBeInTheDocument();
    expect(screen.getByText('IRR: 15 %')).toBeInTheDocument();
    expect(screen.getByText('NPV: 300 万円')).toBeInTheDocument();
  });
});
