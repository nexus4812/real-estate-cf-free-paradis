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
    expect(screen.getByText('主要指標')).toBeInTheDocument(); // タイトルは表示される
    expect(screen.getAllByRole('progressbar').length).toBeGreaterThan(0); // ローディングスピナーが表示されることを期待
  });

  it('metricsが渡されたときにMetricCardが描画される', () => {
    render(<MetricsDashboard metrics={mockMetrics} />);
    expect(screen.getByText('表面利回り')).toBeInTheDocument();
    expect(screen.getByText('実質利回り')).toBeInTheDocument();
    expect(screen.getByText('年間キャッシュフロー')).toBeInTheDocument();
  });

  it('metricsが空の場合でもレンダリングされる', () => {
    render(<MetricsDashboard metrics={[]} />);
    expect(screen.getByText('主要指標')).toBeInTheDocument();
    expect(screen.queryByText('表面利回り')).not.toBeInTheDocument();
  });
});
