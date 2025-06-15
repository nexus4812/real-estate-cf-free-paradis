import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from '../LoadingSpinner';

describe('LoadingSpinner', () => {
  it('正常にレンダリングされ、デフォルトメッセージが表示される', () => {
    render(<LoadingSpinner />);
    expect(screen.getByText('読み込み中...')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument(); // スピナーのdivにrole="status"を仮定
  });

  it('messageプロパティが渡されたときに、そのメッセージが表示される', () => {
    render(<LoadingSpinner message="データをロード中..." />);
    expect(screen.getByText('データをロード中...')).toBeInTheDocument();
  });

  it('sizeがsmの場合、正しいクラスが適用される', () => {
    render(<LoadingSpinner size="sm" />);
    expect(screen.getByRole('status')).toHaveClass('w-4 h-4 border-2');
    expect(screen.getByText('読み込み中...')).toHaveClass('text-sm');
  });

  it('sizeがmdの場合、正しいクラスが適用される', () => {
    render(<LoadingSpinner size="md" />);
    expect(screen.getByRole('status')).toHaveClass('w-6 h-6 border-3');
    expect(screen.getByText('読み込み中...')).toHaveClass('text-base');
  });

  it('sizeがlgの場合、正しいクラスが適用される', () => {
    render(<LoadingSpinner size="lg" />);
    expect(screen.getByRole('status')).toHaveClass('w-8 h-8 border-4');
    expect(screen.getByText('読み込み中...')).toHaveClass('text-lg');
  });
});
