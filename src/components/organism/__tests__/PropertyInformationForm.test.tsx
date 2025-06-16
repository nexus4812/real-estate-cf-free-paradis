import { render, screen, fireEvent } from '@testing-library/react';
import { PropertyInformationForm } from '../PropertyInformationForm';

describe('PropertyInformationForm', () => {
  const defaultProps = {
    propertyPrice: 30000000,
    surfaceYield: 5,
    structure: '鉄筋コンクリート造',
    constructionYear: 2000,
    buildingArea: 100,
    onPropertyPriceChange: vi.fn(),
    onSurfaceYieldChange: vi.fn(),
    onStructureChange: vi.fn(),
    onConstructionYearChange: vi.fn(),
    onBuildingAreaChange: vi.fn(),
    errors: {},
  };

  it('すべての入力フィールドが正しくレンダリングされること', () => {
    render(<PropertyInformationForm {...defaultProps} />);

    expect(screen.getByLabelText('物件価格')).toBeInTheDocument();
    expect(screen.getByLabelText('表面利回り')).toBeInTheDocument();
    expect(screen.getByLabelText('建物構造')).toBeInTheDocument();
    expect(screen.getByLabelText('築年')).toBeInTheDocument(); // 築年数から築年に変更
    expect(screen.getByLabelText('建物面積')).toBeInTheDocument();
  });

  it('Propsで渡された値が入力フィールドに正しく表示されること', () => {
    render(<PropertyInformationForm {...defaultProps} />);

    expect(screen.getByLabelText('物件価格')).toHaveValue(3000); // 万円
    expect(screen.getByLabelText('表面利回り')).toHaveValue(5);
    expect(screen.getByLabelText('建物構造')).toHaveValue('鉄筋コンクリート造');
    expect(screen.getByLabelText('築年')).toHaveValue(2000); // 築年数から築年に変更
    expect(screen.getByLabelText('建物面積')).toHaveValue(100);
  });

  it('入力値が変更されたときにonChangeハンドラが呼び出されること', () => {
    render(<PropertyInformationForm {...defaultProps} />);

    const propertyPriceInput = screen.getByLabelText('物件価格');
    fireEvent.change(propertyPriceInput, { target: { value: '3500' } });
    expect(defaultProps.onPropertyPriceChange).toHaveBeenCalledWith(35000000); // 万円から円に変換

    const surfaceYieldInput = screen.getByLabelText('表面利回り');
    fireEvent.change(surfaceYieldInput, { target: { value: '6' } });
    expect(defaultProps.onSurfaceYieldChange).toHaveBeenCalledWith(6);

    const structureSelect = screen.getByLabelText('建物構造');
    fireEvent.change(structureSelect, { target: { value: '鉄骨造' } }); // Steelから鉄骨造に変更
    expect(defaultProps.onStructureChange).toHaveBeenCalledWith('鉄骨造'); // Steelから鉄骨造に変更

    const constructionYearInput = screen.getByLabelText('築年'); // 築年数から築年に変更
    fireEvent.change(constructionYearInput, { target: { value: '2010' } });
    expect(defaultProps.onConstructionYearChange).toHaveBeenCalledWith(2010);

    const buildingAreaInput = screen.getByLabelText('建物面積');
    fireEvent.change(buildingAreaInput, { target: { value: '120' } });
    expect(defaultProps.onBuildingAreaChange).toHaveBeenCalledWith(120);
  });

  it('エラーメッセージが正しく表示されること', () => {
    const errors = {
      propertyPrice: '物件価格は必須です',
      surfaceYield: '利回りは必須です',
    };
    render(<PropertyInformationForm {...defaultProps} errors={errors} />);

    expect(screen.getByText('物件価格は必須です')).toBeInTheDocument();
    expect(screen.getByText('利回りは必須です')).toBeInTheDocument();
  });
});
