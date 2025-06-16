import { render, screen, fireEvent } from '@testing-library/react';
import { ConstructionYearInput } from '../ConstructionYearInput';

describe('ConstructionYearInput', () => {
  const currentYear = new Date().getFullYear();

  it('正常にレンダリングされる', () => {
    render(<ConstructionYearInput value={2020} onChange={() => {}} />);
    expect(screen.getByLabelText('築年')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2020')).toBeInTheDocument();
    expect(screen.getByText('年')).toBeInTheDocument();
  });

  it('onChangeイベントが正しく発火する', () => {
    const handleChange = vi.fn();
    render(<ConstructionYearInput value={2020} onChange={handleChange} />);
    const input = screen.getByLabelText('築年');
    fireEvent.change(input, { target: { value: '2021' } });
    expect(handleChange).toHaveBeenCalledWith(2021);
  });

  it('エラーメッセージが表示される', () => {
    const errorMessage = '築年は必須です';
    render(<ConstructionYearInput value={0} onChange={() => {}} error={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('valueが空文字列の場合、onChangeが0で呼び出される', () => {
    const handleChange = vi.fn();
    render(<ConstructionYearInput value={2020} onChange={handleChange} />);
    const input = screen.getByLabelText('築年');
    fireEvent.change(input, { target: { value: '' } });
    expect(handleChange).toHaveBeenCalledWith(0);
  });

  it('placeholderが表示される', () => {
    render(<ConstructionYearInput value={0} onChange={() => {}} />);
    expect(screen.getByPlaceholderText(`例: ${currentYear - 10}`)).toBeInTheDocument();
  });

  it('単位が表示される', () => {
    render(<ConstructionYearInput value={2020} onChange={() => {}} />);
    expect(screen.getByText('年')).toBeInTheDocument();
  });

  it('minとmaxプロパティが正しく設定されている', () => {
    render(<ConstructionYearInput value={2020} onChange={() => {}} />);
    const input = screen.getByLabelText('築年');
    expect(input).toHaveAttribute('min', '1900');
    expect(input).toHaveAttribute('max', currentYear.toString());
  });
});
