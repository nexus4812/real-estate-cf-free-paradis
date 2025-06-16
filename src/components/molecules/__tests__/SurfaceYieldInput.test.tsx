import { render, screen, fireEvent } from '@testing-library/react';
import { SurfaceYieldInput } from '../SurfaceYieldInput';

describe('SurfaceYieldInput', () => {
  it('正常にレンダリングされる', () => {
    render(<SurfaceYieldInput value={5.0} onChange={() => {}} />);
    expect(screen.getByLabelText('表面利回り')).toBeInTheDocument();
    expect(screen.getByDisplayValue('5')).toBeInTheDocument();
    expect(screen.getByText('%')).toBeInTheDocument();
  });

  it('onChangeイベントが正しく発火する', () => {
    const handleChange = vi.fn();
    render(<SurfaceYieldInput value={5.0} onChange={handleChange} />);
    const input = screen.getByLabelText('表面利回り');
    fireEvent.change(input, { target: { value: '6.5' } });
    expect(handleChange).toHaveBeenCalledWith(6.5);
  });

  it('エラーメッセージが表示される', () => {
    const errorMessage = '表面利回りは必須です';
    render(<SurfaceYieldInput value={0} onChange={() => {}} error={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('valueが空文字列の場合、onChangeが0で呼び出される', () => {
    const handleChange = vi.fn();
    render(<SurfaceYieldInput value={5.0} onChange={handleChange} />);
    const input = screen.getByLabelText('表面利回り');
    fireEvent.change(input, { target: { value: '' } });
    expect(handleChange).toHaveBeenCalledWith(0);
  });

  it('placeholderが表示される', () => {
    render(<SurfaceYieldInput value={0} onChange={() => {}} />);
    expect(screen.getByPlaceholderText('例: 5.0')).toBeInTheDocument();
  });

  it('単位が表示される', () => {
    render(<SurfaceYieldInput value={5.0} onChange={() => {}} />);
    expect(screen.getByText('%')).toBeInTheDocument();
  });
});
