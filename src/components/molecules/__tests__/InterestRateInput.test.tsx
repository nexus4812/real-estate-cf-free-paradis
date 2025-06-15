import { render, screen, fireEvent } from '@testing-library/react';
import { InterestRateInput } from '../InterestRateInput';

describe('InterestRateInput', () => {
  it('正常にレンダリングされる', () => {
    render(<InterestRateInput value={1.5} onChange={() => {}} />);
    expect(screen.getByLabelText('金利')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1.5')).toBeInTheDocument();
    expect(screen.getByText('%')).toBeInTheDocument();
  });

  it('onChangeイベントが正しく発火する', () => {
    const handleChange = jest.fn();
    render(<InterestRateInput value={1.5} onChange={handleChange} />);
    const input = screen.getByLabelText('金利');
    fireEvent.change(input, { target: { value: '2.0' } });
    expect(handleChange).toHaveBeenCalledWith(2.0);
  });

  it('エラーメッセージが表示される', () => {
    const errorMessage = '金利は必須です';
    render(<InterestRateInput value={0} onChange={() => {}} error={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('valueが空文字列の場合、onChangeが0で呼び出される', () => {
    const handleChange = jest.fn();
    render(<InterestRateInput value={1.5} onChange={handleChange} />);
    const input = screen.getByLabelText('金利');
    fireEvent.change(input, { target: { value: '' } });
    expect(handleChange).toHaveBeenCalledWith(0);
  });

  it('placeholderが表示される', () => {
    render(<InterestRateInput value={0} onChange={() => {}} />);
    expect(screen.getByPlaceholderText('例: 1.5')).toBeInTheDocument();
  });

  it('単位が表示される', () => {
    render(<InterestRateInput value={1.5} onChange={() => {}} />);
    expect(screen.getByText('%')).toBeInTheDocument();
  });
});
