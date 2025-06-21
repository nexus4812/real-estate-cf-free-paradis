import { render, screen } from '@testing-library/react';
import HomePage from '../page';
import { vi } from 'vitest';
import { useRouter } from 'next/navigation';

// next/navigation の useRouter をモック
vi.mock('next/navigation', async (importOriginal) => {
  const actual = await importOriginal() as typeof import('next/navigation');
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
    })),
  };
});

describe('HomePage', () => {
  it('正常にレンダリングされる', () => {
    render(<HomePage />);
    expect(screen.getByText('不動産投資シミュレーター')).toBeInTheDocument();
    expect(screen.getByText('あなたの不動産投資を強力にサポート')).toBeInTheDocument();
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
    startButton.click();

    expect(mockPush).toHaveBeenCalledWith('/simulation');
  });
});
