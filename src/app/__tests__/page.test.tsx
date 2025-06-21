import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from '../page';
import { vi } from 'vitest';
import { useRouter } from 'next/navigation';

// next/navigation の useRouter をモック
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

describe('HomePage', () => {
  it('正常にレンダリングされる', () => {
    render(<HomePage />);
    expect(screen.getByText('不動産投資シミュレーター')).toBeInTheDocument();
    expect(screen.getByText('このアプリケーションは、不動産投資におけるキャッシュフロー、利回り、税引前収益などを詳細に計算し、視覚的に分かりやすく表示します。 あなたの投資計画を強力にサポートします。')).toBeInTheDocument();
  });

  it('シミュレーション開始ボタンが表示される', () => {
    render(<HomePage />);
    expect(screen.getByRole('button', { name: 'シミュレーションを開始する' })).toBeInTheDocument();
  });

  it('シミュレーション開始ボタンをクリックするとシミュレーションページに遷移する', () => {
    const mockPush = vi.fn();
    (useRouter as vi.Mock).mockReturnValue({
      push: mockPush,
    });

    render(<HomePage />);
    const startButton = screen.getByRole('button', { name: 'シミュレーションを開始する' });
    fireEvent.click(startButton); // startButton.click() を fireEvent.click(startButton) に変更

    expect(mockPush).toHaveBeenCalledWith('/simulation');
  });
});
