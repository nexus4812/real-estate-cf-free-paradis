import { render, screen } from '@testing-library/react';
import { MetricsDashboard } from '../MetricsDashboard';
import { MetricCardProps } from '@/components/molecules/MetricCard';

describe('MetricsDashboard', () => {
  const mockMetrics: MetricCardProps[] = [
    { title: '表面利回り', value: 5.00, unit: '%', change: -0.001, trend: 'down' },
    { title: '実質利回り', value: 4.50, unit: '%', change: -0.002, trend: 'down' },
    { title: '年間キャッシュフロー', value: 100, unit: '万円', change: 0.05, trend: 'up' },
  ];

  it('正常にレンダリングされる', () => {
    render(<MetricsDashboard metrics={mockMetrics} />);
    expect(screen.getByText('主要指標')).toBeInTheDocument();
  });

  it('loading状態のときにローディング表示がされる', () => {
    render(<MetricsDashboard metrics={[]} loading={true} />);
    expect(screen.getByText('指標を読み込み中...')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument(); // LoadingSpinnerのrole="status"を期待
  });

  it('metricsが渡されたときにMetricCardが描画される', () => {
    render(<MetricsDashboard metrics={mockMetrics} />);
    expect(screen.getByText('表面利回り')).toBeInTheDocument();
    expect(screen.getByText('実質利回り')).toBeInTheDocument();
    expect(screen.getByText('年間キャッシュフロー')).toBeInTheDocument();
  });

  it('metricsが空の場合でもレンダリングされる', () => {
    render(<MetricsDashboard metrics={[]} />);
    expect(screen.getByText('表示する指標がありません。')).toBeInTheDocument();
    expect(screen.queryByText('主要指標')).not.toBeInTheDocument(); // 主要指標は表示されない
    expect(screen.queryByText('表面利回り')).not.toBeInTheDocument();
  });
});
