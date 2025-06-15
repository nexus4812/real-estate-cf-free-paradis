import { render, screen } from '@testing-library/react';
import { MetricCard } from '../MetricCard';
import { Icon } from '@/components/atoms/Icon'; // Iconコンポーネントをインポート

// Iconコンポーネントをモック
jest.mock('@/components/atoms/Icon', () => ({
  Icon: jest.fn(({ name, size, color }) => (
    <span data-testid="mock-icon" data-name={name} data-size={size} data-color={color}>
      {name}
    </span>
  )),
}));

describe('MetricCard', () => {
  afterEach(() => {
    jest.clearAllMocks(); // 各テスト後にモックの呼び出し履歴をクリア
  });

  it('正常にレンダリングされ、タイトル、値、単位が表示される', () => {
    render(<MetricCard title="総資産" value={100000000} unit="円" />);
    expect(screen.getByText('総資産')).toBeInTheDocument();
    expect(screen.getByText('100,000,000')).toBeInTheDocument();
    expect(screen.getByText('円')).toBeInTheDocument();
  });

  it('変化率とトレンドアイコンが表示される (up)', () => {
    render(<MetricCard title="キャッシュフロー" value={100000} unit="円" change={0.05} trend="up" />);
    expect(screen.getByText('5.0%')).toBeInTheDocument();
    expect(screen.getByTestId('mock-icon')).toHaveAttribute('data-name', 'ArrowUpIcon');
    expect(screen.getByTestId('mock-icon')).toHaveAttribute('data-color', 'green');
    expect(screen.getByText('5.0%')).toHaveClass('text-green-600');
  });

  it('変化率とトレンドアイコンが表示される (down)', () => {
    render(<MetricCard title="キャッシュフロー" value={-50000} unit="円" change={-0.02} trend="down" />);
    expect(screen.getByText('-2.0%')).toBeInTheDocument();
    expect(screen.getByTestId('mock-icon')).toHaveAttribute('data-name', 'ArrowDownIcon');
    expect(screen.getByTestId('mock-icon')).toHaveAttribute('data-color', 'red');
    expect(screen.getByText('-2.0%')).toHaveClass('text-red-600');
  });

  it('変化率とトレンドアイコンが表示される (neutral)', () => {
    render(<MetricCard title="キャッシュフロー" value={0} unit="円" change={0} trend="neutral" />);
    expect(screen.getByText('0.0%')).toBeInTheDocument();
    expect(screen.getByTestId('mock-icon')).toHaveAttribute('data-name', 'MinusIcon');
    expect(screen.getByTestId('mock-icon')).toHaveAttribute('data-color', 'gray');
    expect(screen.getByText('0.0%')).toHaveClass('text-gray-600');
  });

  it('loadingがtrueの場合、ローディング状態が表示される', () => {
    render(<MetricCard title="総資産" value={0} unit="円" loading={true} />);
    expect(screen.getByRole('article')).toHaveClass('animate-pulse'); // Cardコンポーネントがarticleロールを持つと仮定
    expect(screen.queryByText('総資産')).not.toBeInTheDocument();
    expect(screen.queryByText('円')).not.toBeInTheDocument();
  });

  it('changeがundefinedの場合、変化率は表示されない', () => {
    render(<MetricCard title="総資産" value={100000000} unit="円" />);
    expect(screen.queryByText('%')).not.toBeInTheDocument();
    expect(screen.queryByTestId('mock-icon')).not.toBeInTheDocument();
  });
});
