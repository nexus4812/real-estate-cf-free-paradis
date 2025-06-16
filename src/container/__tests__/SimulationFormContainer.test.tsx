import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SimulationFormContainer } from '../SimulationFormContainer';
import { useSimulationStore } from '@/store/useSimulationStore';
import { useForm } from 'react-hook-form';

// useSimulationStoreのモック
vi.mock('@/store/useSimulationStore', () => ({
  useSimulationStore: vi.fn(),
}));
// useFormのモック
vi.mock('react-hook-form');

describe('SimulationFormContainer', () => {
  let mockSetInput: vi.mock;
  let mockRunSimulation: vi.mock;
  let mockUseForm: vi.mockedFunction<typeof useForm>;

  beforeEach(() => {
    mockSetInput = vi.fn();
    mockRunSimulation = vi.fn();
    mockUseForm = useForm as vi.mockedFunction<typeof useForm>;

    // useSimulationStoreのモック実装
    (useSimulationStore as vi.mock).mockImplementation(() => ({
      input: {
        propertyPrice: 0,
        surfaceYield: 0,
        structure: 'RC',
        constructionYear: 0,
        buildingArea: 0,
        selfFunds: 0,
        interestRate: 0,
        loanTerm: 0,
        vacancyRate: 0,
        rentIncreaseRate: 0,
        managementFeeRatio: 0,
        repairCostRatio: 0,
        largeScaleRepairPlans: [],
        landPrice: 0,
        buildingPrice: 0,
      },
      results: null,
      loading: false,
      error: null,
      setInput: mockSetInput,
      runSimulation: mockRunSimulation,
      reset: vi.fn(),
    }));

    // useFormのモック実装
    mockUseForm.mockReturnValue({
      register: vi.fn(),
      handleSubmit: vi.fn((fn) => fn),
      formState: { errors: {} },
      watch: vi.fn(() => ({
        propertyPrice: 0,
        surfaceYield: 0,
        structure: 'RC',
        constructionYear: 0,
        buildingArea: 0,
        selfFunds: 0,
        interestRate: 0,
        loanTerm: 0,
        vacancyRate: 0,
        rentIncreaseRate: 0,
        managementFeeRatio: 0,
        repairCostRatio: 0,
        largeScaleRepairPlans: [],
        landPrice: 0,
        buildingPrice: 0,
      })),
      setValue: vi.fn(),
    } as any);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('フォーム送信時にシミュレーションが実行される', async () => {
    render(<SimulationFormContainer />);

    const form = screen.getByRole('form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockRunSimulation).toHaveBeenCalledTimes(1);
    });
  });

  it('入力値が変更されたときにsetInputが呼び出されること', async () => {
    // useSimulationStoreのsetInputモックはbeforeEachで定義済み

    // useFormのwatchモックを更新
    mockUseForm.mockReturnValue({
      register: vi.fn(),
      handleSubmit: vi.fn((fn) => fn),
      formState: { errors: {} },
      watch: vi.fn(() => ({
        propertyPrice: 50000000,
        surfaceYield: 0,
        structure: 'RC',
        constructionYear: 0,
        buildingArea: 0,
        selfFunds: 0,
        interestRate: 0,
        loanTerm: 0,
        vacancyRate: 0,
        rentIncreaseRate: 0,
        managementFeeRatio: 0,
        repairCostRatio: 0,
        largeScaleRepairPlans: [],
        landPrice: 0,
        buildingPrice: 0,
      })),
      setValue: vi.fn(),
    } as any);

    const { rerender } = render(<SimulationFormContainer />);

    rerender(<SimulationFormContainer />); // コンポーネントを再レンダリングしてuseEffectをトリガー

    await waitFor(() => {
      expect(mockSetInput).toHaveBeenCalledWith(
        expect.objectContaining({ propertyPrice: 50000000 })
      );
    });
  });
});
