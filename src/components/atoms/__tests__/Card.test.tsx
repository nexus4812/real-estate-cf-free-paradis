import { render, screen } from '@testing-library/react';
import { Card } from '../Card';

describe('Card', () => {
  it('子要素を正常にレンダリングする', () => {
    render(<Card><div>テストコンテンツ</div></Card>);
    expect(screen.getByText('テストコンテンツ')).toBeInTheDocument();
    expect(screen.getByTestId('card')).toBeInTheDocument();
  });

  it('デフォルトのパディングとシャドウクラスが適用される', () => {
    render(<Card><div>テストコンテンツ</div></Card>);
    const cardElement = screen.getByTestId('card');
    expect(cardElement).toHaveClass('p-6');
    expect(cardElement).toHaveClass('shadow-md');
    expect(cardElement).toHaveClass('border');
    expect(cardElement).toHaveClass('border-gray-200');
    expect(cardElement).toHaveClass('bg-white');
    expect(cardElement).toHaveClass('rounded-lg');
  });

  it('カスタムパディングが適用される', () => {
    render(<Card padding="sm"><div>テストコンテンツ</div></Card>);
    const cardElement = screen.getByTestId('card');
    expect(cardElement).toHaveClass('p-4');
    expect(cardElement).not.toHaveClass('p-6');
  });

  it('シャドウが適用されない', () => {
    render(<Card shadow="none"><div>テストコンテンツ</div></Card>);
    const cardElement = screen.getByTestId('card');
    expect(cardElement).toHaveClass('shadow-none');
    expect(cardElement).not.toHaveClass('shadow-md');
  });

  it('ボーダーが適用されない', () => {
    render(<Card border={false}><div>テストコンテンツ</div></Card>);
    const cardElement = screen.getByTestId('card');
    expect(cardElement).not.toHaveClass('border');
    expect(cardElement).not.toHaveClass('border-gray-200');
  });

  it('追加のクラスが適用される', () => {
    render(<Card className="bg-blue-100"><div>テストコンテンツ</div></Card>);
    const cardElement = screen.getByTestId('card');
    expect(cardElement).toHaveClass('bg-blue-100');
  });
});
