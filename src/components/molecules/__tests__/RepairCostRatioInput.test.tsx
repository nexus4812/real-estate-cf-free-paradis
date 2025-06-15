import { render, screen, fireEvent } from '@testing-library/react';
import { RepairCostRatioInput } from '../RepairCostRatioInput';

describe('RepairCostRatioInput', () => {
  it('正常にレンダリングされる', () => {
    render(<RepairCostRatioInput value={1.0} onChange={() => {}} />);
    expect(screen.getByLabelText('修繕費率')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1')).toBeInTheDocument();
    expect(screen.getByText('%')).toBeInTheDocument();
  });

  it('onChangeイベントが正しく発火する', () => {
    const handleChange = jest.fn();
    render(<RepairCostRatioInput value={1.0} onChange={handleChange} />);
    const input = screen.getByLabelText('修繕費率');
    fireEvent.change(input, { target: { value: '0.8' } });
    expect(handleChange).toHaveBeenCalledWith(0.8);
  });

  it('エラーメッセージが表示される', () => {
    const errorMessage = '修繕費率は必須です';
    render(<RepairCostRatioInput value={0} onChange={() => {}} error={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('valueが空文字列の場合、onChangeが0で呼び出される', () => {
    const handleChange = jest.fn();
    render(<RepairCostRatioInput value={1.0} onChange={handleChange} />);
    const input = screen.getByLabelText('修繕費率');
    fireEvent.change(input, { target: { value: '' } });
    expect(handleChange).toHaveBeenCalledWith(0);
  });

  it('placeholderが表示される', () => {
    render(<RepairCostRatioInput value={0} onChange={() => {}} />);
    expect(screen.getByPlaceholderText('例: 1.0')).toBeInTheDocument();
  });

  it('単位が表示される', () => {
    render(<RepairCostRatioInput value={1.0} onChange={() => {}} />);
    expect(screen.getByText('%')).toBeInTheDocument();
  });
});
