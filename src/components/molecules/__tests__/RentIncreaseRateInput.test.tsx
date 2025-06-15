import { render, screen, fireEvent } from '@testing-library/react';
import { RentIncreaseRateInput } from '../RentIncreaseRateInput';

describe('RentIncreaseRateInput', () => {
  it('正常にレンダリングされる', () => {
    render(<RentIncreaseRateInput value={1.0} onChange={() => {}} />);
    expect(screen.getByLabelText('家賃上昇率')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1')).toBeInTheDocument();
    expect(screen.getByText('%')).toBeInTheDocument();
  });

  it('onChangeイベントが正しく発火する', () => {
    const handleChange = jest.fn();
    render(<RentIncreaseRateInput value={1.0} onChange={handleChange} />);
    const input = screen.getByLabelText('家賃上昇率');
    fireEvent.change(input, { target: { value: '0.5' } });
    expect(handleChange).toHaveBeenCalledWith(0.5);
  });

  it('エラーメッセージが表示される', () => {
    const errorMessage = '家賃上昇率は必須です';
    render(<RentIncreaseRateInput value={0} onChange={() => {}} error={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('valueが空文字列の場合、onChangeが0で呼び出される', () => {
    const handleChange = jest.fn();
    render(<RentIncreaseRateInput value={1.0} onChange={handleChange} />);
    const input = screen.getByLabelText('家賃上昇率');
    fireEvent.change(input, { target: { value: '' } });
    expect(handleChange).toHaveBeenCalledWith(0);
  });

  it('placeholderが表示される', () => {
    render(<RentIncreaseRateInput value={0} onChange={() => {}} />);
    expect(screen.getByPlaceholderText('例: 1.0')).toBeInTheDocument();
  });

  it('単位が表示される', () => {
    render(<RentIncreaseRateInput value={1.0} onChange={() => {}} />);
    expect(screen.getByText('%')).toBeInTheDocument();
  });
});
