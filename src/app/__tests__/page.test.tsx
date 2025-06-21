import { render, screen } from '@testing-library/react';
import HomePage from '../page';
import { vi } from 'vitest';

// next/link をモック
vi.mock('next/link', () => ({
  __esModule: true,
  default: vi.fn(({ children, href }) => (
    <a href={href}>{children}</a>
  )),
}));

describe('HomePage', () => {
  it('正常にレンダリングされる', () => {
    render(<HomePage />);
    expect(screen.getByText('不動産投資シミュレーター')).toBeInTheDocument();
    expect(screen.getByText('このアプリケーションは、不動産投資におけるキャッシュフロー、利回り、税引前収益などを詳細に計算し、視覚的に分かりやすく表示します。 あなたの投資計画を強力にサポートします。')).toBeInTheDocument();
  });

  it('シミュレーション開始ボタンが表示され、正しいリンクを持つ', () => {
    render(<HomePage />);
    const startButton = screen.getByRole('button', { name: 'シミュレーションを開始する' });
    expect(startButton).toBeInTheDocument();
    // Linkコンポーネントがaタグとしてレンダリングされることを期待し、hrefを検証
    expect(startButton.closest('a')).toHaveAttribute('href', '/simulation');
  });
});
