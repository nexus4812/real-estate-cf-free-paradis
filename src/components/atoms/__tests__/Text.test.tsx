import { render, screen } from '@testing-library/react';
import { Text } from '../Text';

describe('Text', () => {
  it('正常にレンダリングされる', () => {
    render(<Text>Hello</Text>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('デフォルトのサイズ、色、太さ、配置が適用される', () => {
    render(<Text>Default Text</Text>);
    const textElement = screen.getByText('Default Text');
    expect(textElement).toHaveClass('text-base');
    expect(textElement).toHaveClass('text-black');
    expect(textElement).toHaveClass('font-normal');
    expect(textElement).toHaveClass('text-left');
  });

  it('sizeプロパティが正しく適用される', () => {
    render(<Text size="lg">Large Text</Text>);
    expect(screen.getByText('Large Text')).toHaveClass('text-lg');
  });

  it('colorプロパティが正しく適用される', () => {
    render(<Text color="blue">Blue Text</Text>);
    expect(screen.getByText('Blue Text')).toHaveClass('text-blue-700');
  });

  it('weightプロパティが正しく適用される', () => {
    render(<Text weight="bold">Bold Text</Text>);
    expect(screen.getByText('Bold Text')).toHaveClass('font-bold');
  });

  it('alignプロパティが正しく適用される', () => {
    render(<Text align="center">Centered Text</Text>);
    expect(screen.getByText('Centered Text')).toHaveClass('text-center');
  });

  it('classNameプロパティが正しく適用される', () => {
    render(<Text className="custom-class">Custom Text</Text>);
    expect(screen.getByText('Custom Text')).toHaveClass('custom-class');
  });

  it('複数のプロパティが組み合わせて適用される', () => {
    render(
      <Text size="xl" color="red" weight="semibold" align="right" className="extra-class">
        Combined Text
      </Text>
    );
    const textElement = screen.getByText('Combined Text');
    expect(textElement).toHaveClass('text-xl');
    expect(textElement).toHaveClass('text-red-700');
    expect(textElement).toHaveClass('font-semibold');
    expect(textElement).toHaveClass('text-right');
    expect(textElement).toHaveClass('extra-class');
  });
});
