import { render, screen } from '@testing-library/react';
import { Badge } from '../Badge';

describe('Badge', () => {
  it('正常にレンダリングされる', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('childrenが正しく表示される', () => {
    render(<Badge>Hello Badge</Badge>);
    expect(screen.getByText('Hello Badge')).toBeInTheDocument();
  });

  it('デフォルトのvariantとsizeが適用される', () => {
    render(<Badge>Default</Badge>);
    const badgeElement = screen.getByText('Default');
    expect(badgeElement).toHaveClass('bg-gray-100');
    expect(badgeElement).toHaveClass('text-gray-800');
    expect(badgeElement).toHaveClass('px-2.5');
    expect(badgeElement).toHaveClass('py-0.5');
    expect(badgeElement).toHaveClass('text-sm');
  });

  it('variantプロパティが正しく適用される (primary)', () => {
    render(<Badge variant="primary">Primary</Badge>);
    const badgeElement = screen.getByText('Primary');
    expect(badgeElement).toHaveClass('bg-blue-100');
    expect(badgeElement).toHaveClass('text-blue-800');
  });

  it('variantプロパティが正しく適用される (success)', () => {
    render(<Badge variant="success">Success</Badge>);
    const badgeElement = screen.getByText('Success');
    expect(badgeElement).toHaveClass('bg-green-100');
    expect(badgeElement).toHaveClass('text-green-800');
  });

  it('sizeプロパティが正しく適用される (sm)', () => {
    render(<Badge size="sm">Small</Badge>);
    const badgeElement = screen.getByText('Small');
    expect(badgeElement).toHaveClass('px-2');
    expect(badgeElement).toHaveClass('py-0.5');
    expect(badgeElement).toHaveClass('text-xs');
  });

  it('sizeプロパティが正しく適用される (lg)', () => {
    render(<Badge size="lg">Large</Badge>);
    const badgeElement = screen.getByText('Large');
    expect(badgeElement).toHaveClass('px-3');
    expect(badgeElement).toHaveClass('py-1');
    expect(badgeElement).toHaveClass('text-base');
  });

  it('classNameプロパティが正しく適用される', () => {
    render(<Badge className="custom-badge">Custom</Badge>);
    expect(screen.getByText('Custom')).toHaveClass('custom-badge');
  });
});
