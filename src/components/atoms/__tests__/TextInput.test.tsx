import { render, screen, fireEvent } from '@testing-library/react';
import { TextInput } from '../TextInput';

describe('TextInput', () => {
  it('正常にレンダリングされる', () => {
    render(<TextInput value="test" onChange={() => {}} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue('test');
  });

  it('値が変更されたときにonChangeが呼ばれる', () => {
    const handleChange = vi.fn();
    render(<TextInput value="" onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('new value');
  });

  it('placeholderが表示される', () => {
    render(<TextInput value="" onChange={() => {}} placeholder="テキストを入力" />);
    expect(screen.getByPlaceholderText('テキストを入力')).toBeInTheDocument();
  });

  it('errorメッセージが表示される', () => {
    render(<TextInput value="" onChange={() => {}} error="エラーです" />);
    expect(screen.getByText('エラーです')).toBeInTheDocument();
  });

  it('disabled状態で無効化される', () => {
    render(<TextInput value="" onChange={() => {}} disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('type属性が正しく適用される', () => {
    render(<TextInput value="" onChange={() => {}} type="email" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
  });

  it('デフォルトのtypeがtextであること', () => {
    render(<TextInput value="" onChange={() => {}} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
  });
});
