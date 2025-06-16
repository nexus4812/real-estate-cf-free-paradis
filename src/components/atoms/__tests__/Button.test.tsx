import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  it('正常にレンダリングされる', () => {
    render(<Button>テストボタン</Button>);
    expect(screen.getByRole('button', { name: 'テストボタン' })).toBeInTheDocument();
  });

  it('クリックイベントが発火する', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>クリック</Button>);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disabled状態で無効化される', () => {
    render(<Button disabled>無効ボタン</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('variantがprimaryの場合、適切なクラスが適用される', () => {
    render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass(
      'bg-blue-600', 'hover:bg-blue-700', 'text-white', 'font-medium', 'py-3', 'px-6', 'rounded-md',
      'transition-colors', 'duration-200', 'focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500', 'focus:ring-offset-2'
    );
  });

  it('variantがsecondaryの場合、適切なクラスが適用される', () => {
    render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass(
      'bg-gray-200', 'hover:bg-gray-300', 'text-gray-800', 'font-medium', 'py-3', 'px-6', 'rounded-md',
      'transition-colors', 'duration-200', 'focus:outline-none', 'focus:ring-2', 'focus:ring-gray-500', 'focus:ring-offset-2'
    );
  });

  it('variantがdangerの場合、適切なクラスが適用される', () => {
    render(<Button variant="danger">Danger</Button>);
    expect(screen.getByRole('button')).toHaveClass(
      'bg-red-600', 'hover:bg-red-700', 'text-white', 'font-medium', 'py-3', 'px-6', 'rounded-md',
      'transition-colors', 'duration-200', 'focus:outline-none', 'focus:ring-2', 'focus:ring-red-500', 'focus:ring-offset-2'
    );
  });

  it('typeがsubmitの場合、適切なtype属性が適用される', () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });
});
