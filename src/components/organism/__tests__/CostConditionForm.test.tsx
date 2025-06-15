import { render, screen, fireEvent } from '@testing-library/react';
import { CostConditionForm } from '../CostConditionForm';
import { ManagementFeeRatioInput } from '@/components/molecules/ManagementFeeRatioInput';
import { RepairCostRatioInput } from '@/components/molecules/RepairCostRatioInput';

// Moleculeコンポーネントをモック
jest.mock('@/components/molecules/ManagementFeeRatioInput', () => ({
  ManagementFeeRatioInput: jest.fn(({ value, onChange, error }) => (
    <div>
      <label htmlFor="managementFeeRatio">管理費率</label>
      <input data-testid="managementFeeRatio-input" value={value} onChange={(e) => onChange(Number(e.target.value))} />
      {error && <span data-testid="managementFeeRatio-error">{error}</span>}
    </div>
  )),
}));

jest.mock('@/components/molecules/RepairCostRatioInput', () => ({
  RepairCostRatioInput: jest.fn(({ value, onChange, error }) => (
    <div>
      <label htmlFor="repairCostRatio">修繕費率</label>
      <input data-testid="repairCostRatio-input" value={value} onChange={(e) => onChange(Number(e.target.value))} />
      {error && <span data-testid="repairCostRatio-error">{error}</span>}
    </div>
  )),
}));

describe('CostConditionForm', () => {
  const defaultProps = {
    managementFeeRatio: 5.0,
    repairCostRatio: 1.0,
    onManagementFeeRatioChange: jest.fn(),
    onRepairCostRatioChange: jest.fn(),
    errors: {},
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('正常にレンダリングされる', () => {
    render(<CostConditionForm {...defaultProps} />);
    expect(screen.getByText('支出条件')).toBeInTheDocument();
    expect(screen.getByLabelText('管理費率')).toBeInTheDocument();
    expect(screen.getByLabelText('修繕費率')).toBeInTheDocument();
  });

  it('ManagementFeeRatioInputのonChangeが正しく呼び出される', () => {
    render(<CostConditionForm {...defaultProps} />);
    fireEvent.change(screen.getByTestId('managementFeeRatio-input'), { target: { value: '6.0' } });
    expect(defaultProps.onManagementFeeRatioChange).toHaveBeenCalledWith(6.0);
  });

  it('RepairCostRatioInputのonChangeが正しく呼び出される', () => {
    render(<CostConditionForm {...defaultProps} />);
    fireEvent.change(screen.getByTestId('repairCostRatio-input'), { target: { value: '0.5' } });
    expect(defaultProps.onRepairCostRatioChange).toHaveBeenCalledWith(0.5);
  });

  it('エラーメッセージが正しく表示される', () => {
    const errors = {
      managementFeeRatio: '管理費率は必須です',
      repairCostRatio: '修繕費率は必須です',
    };
    render(<CostConditionForm {...defaultProps} errors={errors} />);
    expect(screen.getByTestId('managementFeeRatio-error')).toHaveTextContent('管理費率は必須です');
    expect(screen.getByTestId('repairCostRatio-error')).toHaveTextContent('修繕費率は必須です');
  });
});
