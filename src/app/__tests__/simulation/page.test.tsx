import { render, screen } from '@testing-library/react';
import SimulationPage from '@/app/simulation/page';
import { vi } from 'vitest';

// Container コンポーネントをモック
vi.mock('@/container/SimulationFormContainer', () => ({
  SimulationFormContainer: vi.fn(() => <div>Mock SimulationFormContainer</div>),
}));
vi.mock('@/container/SimulationResultContainer', () => ({
  SimulationResultContainer: vi.fn(() => <div>Mock SimulationResultContainer</div>),
}));

describe('SimulationPage', () => {
  it('正常にレンダリングされる', () => {
    render(<SimulationPage />);
    expect(screen.getByText('不動産投資シミュレーション')).toBeInTheDocument();
  });

  it('SimulationFormContainer がレンダリングされる', () => {
    render(<SimulationPage />);
    expect(screen.getByText('Mock SimulationFormContainer')).toBeInTheDocument();
  });

  it('SimulationResultContainer がレンダリングされる', () => {
    render(<SimulationPage />);
    expect(screen.getByText('Mock SimulationResultContainer')).toBeInTheDocument();
  });
});
