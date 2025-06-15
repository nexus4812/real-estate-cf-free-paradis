import { render, screen } from '@testing-library/react';
import { Label } from '../Label';

describe('Label', () => {
  it('正常にレンダリングされる', () => {
    render(<Label>テストラベル</Label>);
    expect(screen.getByText('テストラベル')).toBeInTheDocument();
  });

  it('htmlFor属性が正しく適用される', () => {
    render(<Label htmlFor="test-input">テストラベル</Label>);
    expect(screen.getByText('テストラベル')).toHaveAttribute('for', 'test-input');
  });

  it('requiredプロパティがtrueの場合にlabel-requiredクラスが適用される', () => {
    render(<Label required>必須ラベル</Label>);
    expect(screen.getByText('必須ラベル')).toHaveClass('label-required');
  });

  it('requiredプロパティがfalseの場合にlabel-requiredクラスが適用されない', () => {
    render(<Label required={false}>通常ラベル</Label>);
    expect(screen.getByText('通常ラベル')).not.toHaveClass('label-required');
  });

  it('childrenが正しく表示される', () => {
    render(<Label><span>子要素</span></Label>);
    expect(screen.getByText('子要素')).toBeInTheDocument();
  });
});
