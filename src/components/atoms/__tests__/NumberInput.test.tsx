import { render, screen, fireEvent } from '@testing-library/react';
import { NumberInput } from '../NumberInput';

describe('NumberInput', () => {
  it('正常にレンダリングされる', () => {
    render(<NumberInput value={123} onChange={() => {}} />);
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
    expect(screen.getByRole('spinbutton')).toHaveValue(123);
  });

  it('値が変更されたときにonChangeが呼ばれる', () => {
    const handleChange = jest.fn();
    render(<NumberInput value={0} onChange={handleChange} />);
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '456' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(456);
  });

  it('無効な入力値の場合、onChangeに0が渡される', () => {
    const handleChange = jest.fn();
    render(<NumberInput value={0} onChange={handleChange} />);
    const input = screen.getByRole('spinbutton');
    // input要素のvalueを明示的に設定することで、テストの安定性を向上
    fireEvent.change(input, { target: { value: 'abc' } });
    expect(handleChange).toHaveBeenCalledWith(0);
  });

  it('placeholderが表示される', () => {
    render(<NumberInput value={0} onChange={() => {}} placeholder="数値を入力" />);
    expect(screen.getByPlaceholderText('数値を入力')).toBeInTheDocument();
  });

  it('errorメッセージが表示される', () => {
    render(<NumberInput value={0} onChange={() => {}} error="エラーです" />);
    expect(screen.getByText('エラーです')).toBeInTheDocument();
  });

  it('disabled状態で無効化される', () => {
    render(<NumberInput value={0} onChange={() => {}} disabled />);
    expect(screen.getByRole('spinbutton')).toBeDisabled();
  });

  it('min, max, step属性が正しく適用される', () => {
    render(<NumberInput value={0} onChange={() => {}} min={0} max={100} step={10} />);
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveAttribute('min', '0');
    expect(input).toHaveAttribute('max', '100');
    expect(input).toHaveAttribute('step', '10');
  });

  it('unitが表示される', () => {
    render(<NumberInput value={100} onChange={() => {}} unit="円" />);
    expect(screen.getByText('円')).toBeInTheDocument();
  });

  it('無効な入力値の場合、onChangeに0が渡される', () => {
    const handleChange = jest.fn();
    render(<NumberInput value={0} onChange={handleChange} />);
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: 'abc' } });
    expect(handleChange).toHaveBeenCalledWith(0);
  });
});
