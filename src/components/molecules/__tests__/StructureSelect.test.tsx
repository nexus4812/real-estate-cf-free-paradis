import { render, screen, fireEvent } from '@testing-library/react';
import { StructureSelect } from '../StructureSelect';
import { allBuildingStructures } from '@/domain/property/buildingStructure';

// allBuildingStructures をモック
vi.mock('@/domain/property/buildingStructure', () => ({
  allBuildingStructures: [
    { label: () => 'RC' },
    { label: () => 'SRC' },
    { label: () => 'Steel' },
    { label: () => 'Wood' },
  ],
}));

describe('StructureSelect', () => {
  it('正常にレンダリングされる', () => {
    const options = allBuildingStructures.map((s) => ({ value: s.label(), label: s.label() }));
    render(<StructureSelect value="RC" onChange={() => {}} options={options} />);
    expect(screen.getByLabelText('建物構造')).toBeInTheDocument();
    expect(screen.getByDisplayValue('RC')).toBeInTheDocument();
  });

  it('onChangeイベントが正しく発火する', () => {
    const handleChange = vi.fn();
    const options = allBuildingStructures.map((s) => ({ value: s.label(), label: s.label() }));
    render(<StructureSelect value="RC" onChange={handleChange} options={options} />);
    const select = screen.getByLabelText('建物構造');
    fireEvent.change(select, { target: { value: 'Steel' } });
    expect(handleChange).toHaveBeenCalledWith('Steel');
  });

  it('エラーメッセージが表示される', () => {
    const errorMessage = '建物構造は必須です';
    const options = allBuildingStructures.map((s) => ({ value: s.label(), label: s.label() }));
    render(<StructureSelect value="" onChange={() => {}} error={errorMessage} options={options} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('オプションが正しく表示される', () => {
    const options = allBuildingStructures.map((s) => ({ value: s.label(), label: s.label() }));
    render(<StructureSelect value="RC" onChange={() => {}} options={options} />);
    expect(screen.getByRole('option', { name: 'RC' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'SRC' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Steel' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Wood' })).toBeInTheDocument();
  });

  it('placeholderが表示される', () => {
    const options = allBuildingStructures.map((s) => ({ value: s.label(), label: s.label() }));
    render(<StructureSelect value="" onChange={() => {}} options={options} />);
    expect(screen.getByRole('option', { name: '選択してください' })).toBeInTheDocument();
  });
});
