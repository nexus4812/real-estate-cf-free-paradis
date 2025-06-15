import { render, screen, fireEvent } from '@testing-library/react';
import { PropertyPriceInput } from '../PropertyPriceInput';

describe('PropertyPriceInput', () => {
  it('初期値が正しく表示されること', () => {
    render(<PropertyPriceInput value={30000000} onChange={() => {}} />);
    const input = screen.getByLabelText('物件価格');
    expect(input).toHaveValue(3000); // 万円単位で表示
  });

  it('入力値が変更されたときにonChangeが正しく呼び出されること', () => {
    const handleChange = jest.fn();
    render(<PropertyPriceInput value={0} onChange={handleChange} />);
    const input = screen.getByLabelText('物件価格');

    fireEvent.change(input, { target: { value: '4000' } });
    expect(handleChange).toHaveBeenCalledWith(40000000); // 万円単位から円に変換されて渡される
  });

  it('エラーメッセージが正しく表示されること', () => {
    render(<PropertyPriceInput value={0} onChange={() => {}} error="必須項目です" />);
    expect(screen.getByText('必須項目です')).toBeInTheDocument();
  });

  it('プレースホルダーが正しく表示されること', () => {
    render(<PropertyPriceInput value={0} onChange={() => {}} />);
    const input = screen.getByPlaceholderText('例: 3000');
    expect(input).toBeInTheDocument();
  });
});
