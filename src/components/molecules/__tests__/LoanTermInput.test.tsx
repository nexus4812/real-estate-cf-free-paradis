import { render, screen, fireEvent } from '@testing-library/react';
import { LoanTermInput } from '../LoanTermInput';

describe('LoanTermInput', () => {
  it('正常にレンダリングされる', () => {
    render(<LoanTermInput value={30} onChange={() => {}} />);
    expect(screen.getByLabelText('借入期間')).toBeInTheDocument();
    expect(screen.getByDisplayValue('30')).toBeInTheDocument();
    expect(screen.getByText('年')).toBeInTheDocument();
  });

  it('onChangeイベントが正しく発火する', () => {
    const handleChange = vi.fn();
    render(<LoanTermInput value={30} onChange={handleChange} />);
    const input = screen.getByLabelText('借入期間');
    fireEvent.change(input, { target: { value: '35' } });
    expect(handleChange).toHaveBeenCalledWith(35);
  });

  it('エラーメッセージが表示される', () => {
    const errorMessage = '借入期間は必須です';
    render(<LoanTermInput value={0} onChange={() => {}} error={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('valueが空文字列の場合、onChangeが0で呼び出される', () => {
    const handleChange = vi.fn();
    render(<LoanTermInput value={30} onChange={handleChange} />);
    const input = screen.getByLabelText('借入期間');
    fireEvent.change(input, { target: { value: '' } });
    expect(handleChange).toHaveBeenCalledWith(0);
  });

  it('placeholderが表示される', () => {
    render(<LoanTermInput value={0} onChange={() => {}} />);
    expect(screen.getByPlaceholderText('例: 30')).toBeInTheDocument();
  });

  it('単位が表示される', () => {
    render(<LoanTermInput value={30} onChange={() => {}} />);
    expect(screen.getByText('年')).toBeInTheDocument();
  });
});
