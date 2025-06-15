import { render, screen, fireEvent } from '@testing-library/react';
import { BuildingAreaInput } from '../BuildingAreaInput';

describe('BuildingAreaInput', () => {
  it('正常にレンダリングされる', () => {
    render(<BuildingAreaInput value={100} onChange={() => {}} />);
    expect(screen.getByLabelText('建物面積')).toBeInTheDocument();
    expect(screen.getByDisplayValue('100')).toBeInTheDocument();
    expect(screen.getByText('㎡')).toBeInTheDocument();
  });

  it('onChangeイベントが正しく発火する', () => {
    const handleChange = jest.fn();
    render(<BuildingAreaInput value={100} onChange={handleChange} />);
    const input = screen.getByLabelText('建物面積');
    fireEvent.change(input, { target: { value: '120' } });
    expect(handleChange).toHaveBeenCalledWith(120);
  });

  it('エラーメッセージが表示される', () => {
    const errorMessage = '建物面積は必須です';
    render(<BuildingAreaInput value={0} onChange={() => {}} error={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('valueが空文字列の場合、onChangeが0で呼び出される', () => {
    const handleChange = jest.fn();
    render(<BuildingAreaInput value={100} onChange={handleChange} />);
    const input = screen.getByLabelText('建物面積');
    fireEvent.change(input, { target: { value: '' } });
    expect(handleChange).toHaveBeenCalledWith(0);
  });

  it('placeholderが表示される', () => {
    render(<BuildingAreaInput value={0} onChange={() => {}} />);
    expect(screen.getByPlaceholderText('例: 100')).toBeInTheDocument();
  });

  it('単位が表示される', () => {
    render(<BuildingAreaInput value={100} onChange={() => {}} />);
    expect(screen.getByText('㎡')).toBeInTheDocument();
  });
});
