import { render, screen, fireEvent } from '@testing-library/react';
import { SelfFundsInput } from '../SelfFundsInput';

describe('SelfFundsInput', () => {
  it('正常にレンダリングされる', () => {
    render(<SelfFundsInput value={5000000} onChange={() => {}} />);
    expect(screen.getByLabelText('自己資金')).toBeInTheDocument();
    expect(screen.getByDisplayValue('500')).toBeInTheDocument();
    expect(screen.getByText('万円')).toBeInTheDocument();
  });

  it('onChangeイベントが正しく発火し、万円から円に変換される', () => {
    const handleChange = vi.fn();
    render(<SelfFundsInput value={5000000} onChange={handleChange} />);
    const input = screen.getByLabelText('自己資金');
    fireEvent.change(input, { target: { value: '600' } });
    expect(handleChange).toHaveBeenCalledWith(600 * 10000); // 600万円を円に変換
  });

  it('エラーメッセージが表示される', () => {
    const errorMessage = '自己資金は必須です';
    render(<SelfFundsInput value={0} onChange={() => {}} error={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('valueが空文字列の場合、onChangeが0で呼び出される', () => {
    const handleChange = vi.fn();
    render(<SelfFundsInput value={5000000} onChange={handleChange} />);
    const input = screen.getByLabelText('自己資金');
    fireEvent.change(input, { target: { value: '' } });
    expect(handleChange).toHaveBeenCalledWith(0);
  });

  it('placeholderが表示される', () => {
    render(<SelfFundsInput value={0} onChange={() => {}} />);
    expect(screen.getByPlaceholderText('例: 500')).toBeInTheDocument();
  });

  it('単位が表示される', () => {
    render(<SelfFundsInput value={5000000} onChange={() => {}} />);
    expect(screen.getByText('万円')).toBeInTheDocument();
  });
});
