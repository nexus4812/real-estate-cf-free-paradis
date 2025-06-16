import { render, screen, fireEvent } from '@testing-library/react';
import { IncomeConditionForm } from '../IncomeConditionForm';
import { VacancyRateInput } from '@/components/molecules/VacancyRateInput';
import { RentIncreaseRateInput } from '@/components/molecules/RentIncreaseRateInput';

// Moleculeコンポーネントをモック
jest.mock('@/components/molecules/VacancyRateInput', () => ({
  VacancyRateInput: jest.fn(({ value, onChange, error }) => (
    <div>
      <label htmlFor="vacancyRate">空室率</label>
      <input id="vacancyRate" data-testid="vacancyRate-input" value={value} onChange={(e) => onChange(Number(e.target.value))} />
      {error && <span data-testid="vacancyRate-error">{error}</span>}
    </div>
  )),
}));

jest.mock('@/components/molecules/RentIncreaseRateInput', () => ({
  RentIncreaseRateInput: jest.fn(({ value, onChange, error }) => (
    <div>
      <label htmlFor="rentIncreaseRate">家賃上昇率</label>
      <input id="rentIncreaseRate" data-testid="rentIncreaseRate-input" value={value} onChange={(e) => onChange(Number(e.target.value))} />
      {error && <span data-testid="rentIncreaseRate-error">{error}</span>}
    </div>
  )),
}));

describe('IncomeConditionForm', () => {
  const defaultProps = {
    vacancyRate: 5.0,
    rentIncreaseRate: 1.0,
    onVacancyRateChange: jest.fn(),
    onRentIncreaseRateChange: jest.fn(),
    errors: {},
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('正常にレンダリングされる', () => {
    render(<IncomeConditionForm {...defaultProps} />);
    expect(screen.getByText('収入条件')).toBeInTheDocument();
    expect(screen.getByLabelText('空室率')).toBeInTheDocument();
    expect(screen.getByLabelText('家賃上昇率')).toBeInTheDocument();
  });

  it('VacancyRateInputのonChangeが正しく呼び出される', () => {
    render(<IncomeConditionForm {...defaultProps} />);
    fireEvent.change(screen.getByTestId('vacancyRate-input'), { target: { value: '6.0' } });
    expect(defaultProps.onVacancyRateChange).toHaveBeenCalledWith(6.0);
  });

  it('RentIncreaseRateInputのonChangeが正しく呼び出される', () => {
    render(<IncomeConditionForm {...defaultProps} />);
    fireEvent.change(screen.getByTestId('rentIncreaseRate-input'), { target: { value: '0.5' } });
    expect(defaultProps.onRentIncreaseRateChange).toHaveBeenCalledWith(0.5);
  });

  it('エラーメッセージが正しく表示される', () => {
    const errors = {
      vacancyRate: '空室率は必須です',
      rentIncreaseRate: '家賃上昇率は必須です',
    };
    render(<IncomeConditionForm {...defaultProps} errors={errors} />);
    expect(screen.getByTestId('vacancyRate-error')).toHaveTextContent('空室率は必須です');
    expect(screen.getByTestId('rentIncreaseRate-error')).toHaveTextContent('家賃上昇率は必須です');
  });
});
