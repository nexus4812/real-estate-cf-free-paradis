import { render, screen, fireEvent } from '@testing-library/react';
import { LoanConditionForm } from '../LoanConditionForm';
import { SelfFundsInput } from '@/components/molecules/SelfFundsInput';
import { InterestRateInput } from '@/components/molecules/InterestRateInput';
import { LoanTermInput } from '@/components/molecules/LoanTermInput';

// Moleculeコンポーネントをモック
jest.mock('@/components/molecules/SelfFundsInput', () => ({
  SelfFundsInput: jest.fn(({ value, onChange, error }) => (
    <div>
      <label htmlFor="selfFunds">自己資金</label>
      <input data-testid="selfFunds-input" value={value} onChange={(e) => onChange(Number(e.target.value))} />
      {error && <span data-testid="selfFunds-error">{error}</span>}
    </div>
  )),
}));

jest.mock('@/components/molecules/InterestRateInput', () => ({
  InterestRateInput: jest.fn(({ value, onChange, error }) => (
    <div>
      <label htmlFor="interestRate">金利</label>
      <input data-testid="interestRate-input" value={value} onChange={(e) => onChange(Number(e.target.value))} />
      {error && <span data-testid="interestRate-error">{error}</span>}
    </div>
  )),
}));

jest.mock('@/components/molecules/LoanTermInput', () => ({
  LoanTermInput: jest.fn(({ value, onChange, error }) => (
    <div>
      <label htmlFor="loanTerm">借入期間</label>
      <input data-testid="loanTerm-input" value={value} onChange={(e) => onChange(Number(e.target.value))} />
      {error && <span data-testid="loanTerm-error">{error}</span>}
    </div>
  )),
}));

describe('LoanConditionForm', () => {
  const defaultProps = {
    selfFunds: 5000000,
    interestRate: 1.5,
    loanTerm: 30,
    onSelfFundsChange: jest.fn(),
    onInterestRateChange: jest.fn(),
    onLoanTermChange: jest.fn(),
    errors: {},
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('正常にレンダリングされる', () => {
    render(<LoanConditionForm {...defaultProps} />);
    expect(screen.getByText('融資条件')).toBeInTheDocument();
    expect(screen.getByLabelText('自己資金')).toBeInTheDocument();
    expect(screen.getByLabelText('金利')).toBeInTheDocument();
    expect(screen.getByLabelText('借入期間')).toBeInTheDocument();
  });

  it('SelfFundsInputのonChangeが正しく呼び出される', () => {
    render(<LoanConditionForm {...defaultProps} />);
    fireEvent.change(screen.getByTestId('selfFunds-input'), { target: { value: '6000000' } });
    expect(defaultProps.onSelfFundsChange).toHaveBeenCalledWith(6000000);
  });

  it('InterestRateInputのonChangeが正しく呼び出される', () => {
    render(<LoanConditionForm {...defaultProps} />);
    fireEvent.change(screen.getByTestId('interestRate-input'), { target: { value: '2.0' } });
    expect(defaultProps.onInterestRateChange).toHaveBeenCalledWith(2.0);
  });

  it('LoanTermInputのonChangeが正しく呼び出される', () => {
    render(<LoanConditionForm {...defaultProps} />);
    fireEvent.change(screen.getByTestId('loanTerm-input'), { target: { value: '35' } });
    expect(defaultProps.onLoanTermChange).toHaveBeenCalledWith(35);
  });

  it('エラーメッセージが正しく表示される', () => {
    const errors = {
      selfFunds: '自己資金は必須です',
      interestRate: '金利は必須です',
      loanTerm: '借入期間は必須です',
    };
    render(<LoanConditionForm {...defaultProps} errors={errors} />);
    expect(screen.getByTestId('selfFunds-error')).toHaveTextContent('自己資金は必須です');
    expect(screen.getByTestId('interestRate-error')).toHaveTextContent('金利は必須です');
    expect(screen.getByTestId('loanTerm-error')).toHaveTextContent('借入期間は必須です');
  });
});
