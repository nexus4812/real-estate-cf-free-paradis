import { render, screen, fireEvent } from '@testing-library/react';
import { SelectInput, SelectOption } from '../SelectInput';

describe('SelectInput', () => {
  const options: SelectOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ];

  it('正常にレンダリングされる', () => {
    render(<SelectInput value="option1" onChange={() => {}} options={options} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('オプションが正しく表示される', () => {
    render(<SelectInput value="option1" onChange={() => {}} options={options} />);
    expect(screen.getByRole('option', { name: 'Option 1' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Option 2' })).toBeInTheDocument();
  });

  it('値が変更されたときにonChangeが呼ばれる', () => {
    const handleChange = jest.fn();
    render(<SelectInput value="option1" onChange={handleChange} options={options} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'option2' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('option2');
  });

  it('placeholderが表示される', () => {
    render(<SelectInput value="" onChange={() => {}} options={options} placeholder="選択してください" />);
    expect(screen.getByRole('option', { name: '選択してください' })).toBeInTheDocument();
  });

  it('errorメッセージが表示される', () => {
    render(<SelectInput value="option1" onChange={() => {}} options={options} error="エラーです" />);
    expect(screen.getByText('エラーです')).toBeInTheDocument();
  });

  it('disabled状態で無効化される', () => {
    render(<SelectInput value="option1" onChange={() => {}} options={options} disabled />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });
});
