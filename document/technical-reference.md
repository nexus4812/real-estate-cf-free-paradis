# 不動産投資シミュレーター 技術リファレンス

## 概要

このドキュメントは、他のモデルが実装作業を引き継ぐ際に必要な技術的詳細情報をまとめたリファレンスです。コンポーネント実装時の具体的なコード例、型定義、スタイリング規則などを記載しています。

---

## 1. プロジェクト構造

### 1.1 ディレクトリ構成

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # トップページ
│   ├── layout.tsx         # ルートレイアウト
│   ├── globals.css        # グローバルスタイル
│   └── simulation/        # シミュレーションページ
│       └── page.tsx
├── components/            # UIコンポーネント
│   ├── atoms/            # 最小UI部品
│   ├── molecules/        # UI部品
│   └── organism/         # 表示構造
├── container/            # ロジック層
├── store/               # Zustand状態管理
├── domain/              # ビジネスロジック (実装済み)
└── stories/             # Ladle ストーリー
```

### 1.2 命名規則

- **ファイル名**: PascalCase (例: `NumberInput.tsx`)
- **コンポーネント名**: PascalCase (例: `NumberInput`)
- **Props型名**: コンポーネント名 + `Props` (例: `NumberInputProps`)
- **関数名**: camelCase (例: `handleChange`)
- **定数**: UPPER_SNAKE_CASE (例: `DEFAULT_VALUES`)

---

## 2. 型定義

### 2.1 基本Props型

```typescript
// Atom層の基本Props
export type BaseInputProps = {
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
};

export type BaseButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

// バリアント型
export type ButtonVariant = 'primary' | 'secondary' | 'danger';
export type Size = 'sm' | 'md' | 'lg';
export type Color = 'gray' | 'blue' | 'green' | 'red' | 'yellow';
```

### 2.2 フォーム関連型

```typescript
// React Hook Form用の型
export type FormFieldProps<T> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  name: keyof T;
};

// バリデーションルール
export type ValidationRules = {
  required?: string;
  min?: { value: number; message: string };
  max?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
};
```

### 2.3 シミュレーション関連型

```typescript
// 既存のSimulationInput型を拡張
export type FormData = SimulationInput & {
  // フォーム固有のフィールドがあれば追加
};

// チャート用データ型
export type ChartDataPoint = {
  year: number;
  value: number;
  label?: string;
};

export type ChartData = {
  data: ChartDataPoint[];
  title: string;
  unit: string;
  color: string;
};
```

---

## 3. コンポーネント実装パターン

### 3.1 Atom層実装例

```typescript
// src/components/atoms/NumberInput.tsx
import React from 'react';

export type NumberInputProps = {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
};

/**
 * 数値入力フィールドコンポーネント
 * @param props - NumberInputProps
 * @returns JSX.Element
 */
export const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  min,
  max,
  step = 1,
  unit,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = parseFloat(e.target.value) || 0;
    onChange(numValue);
  };

  return (
    <div className="relative">
      <input
        type="number"
        value={value || ''}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        className={`
          input-field
          ${error ? 'border-red-500 focus:ring-red-500' : ''}
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
          ${unit ? 'pr-12' : ''}
        `}
      />
      {unit && (
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
          {unit}
        </span>
      )}
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};
```

### 3.2 Molecule層実装例

```typescript
// src/components/molecules/PropertyPriceInput.tsx
import React from 'react';
import { NumberInput } from '@/components/atoms/NumberInput';
import { Label } from '@/components/atoms/Label';

export type PropertyPriceInputProps = {
  value: number;
  onChange: (value: number) => void;
  error?: string;
};

/**
 * 物件価格入力コンポーネント
 * @param props - PropertyPriceInputProps
 * @returns JSX.Element
 */
export const PropertyPriceInput: React.FC<PropertyPriceInputProps> = ({
  value,
  onChange,
  error,
}) => {
  const handleChange = (inputValue: number) => {
    // 万円単位での入力を円に変換
    onChange(inputValue * 10000);
  };

  const displayValue = value / 10000; // 円を万円に変換して表示

  return (
    <div className="space-y-2">
      <Label htmlFor="propertyPrice" required>
        物件価格
      </Label>
      <NumberInput
        value={displayValue}
        onChange={handleChange}
        placeholder="例: 3000"
        error={error}
        min={0}
        step={100}
        unit="万円"
      />
      <p className="text-sm text-gray-600">
        物件の購入価格を万円単位で入力してください
      </p>
    </div>
  );
};
```

### 3.3 Organism層実装例

```typescript
// src/components/organism/PropertyInformationForm.tsx
import React from 'react';
import { PropertyPriceInput } from '@/components/molecules/PropertyPriceInput';
import { SurfaceYieldInput } from '@/components/molecules/SurfaceYieldInput';
import { StructureSelect } from '@/components/molecules/StructureSelect';
import { ConstructionYearInput } from '@/components/molecules/ConstructionYearInput';
import { BuildingAreaInput } from '@/components/molecules/BuildingAreaInput';

export type PropertyInformationFormProps = {
  propertyPrice: number;
  surfaceYield: number;
  structure: string;
  constructionYear: number;
  buildingArea: number;
  onPropertyPriceChange: (value: number) => void;
  onSurfaceYieldChange: (value: number) => void;
  onStructureChange: (value: string) => void;
  onConstructionYearChange: (value: number) => void;
  onBuildingAreaChange: (value: number) => void;
  errors: Record<string, string>;
};

/**
 * 物件情報入力フォームコンポーネント
 * @param props - PropertyInformationFormProps
 * @returns JSX.Element
 */
export const PropertyInformationForm: React.FC<PropertyInformationFormProps> = ({
  propertyPrice,
  surfaceYield,
  structure,
  constructionYear,
  buildingArea,
  onPropertyPriceChange,
  onSurfaceYieldChange,
  onStructureChange,
  onConstructionYearChange,
  onBuildingAreaChange,
  errors,
}) => {
  return (
    <div className="card">
      <h3 className="section-title">物件情報</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PropertyPriceInput
          value={propertyPrice}
          onChange={onPropertyPriceChange}
          error={errors.propertyPrice}
        />
        <SurfaceYieldInput
          value={surfaceYield}
          onChange={onSurfaceYieldChange}
          error={errors.surfaceYield}
        />
        <StructureSelect
          value={structure}
          onChange={onStructureChange}
          error={errors.structure}
        />
        <ConstructionYearInput
          value={constructionYear}
          onChange={onConstructionYearChange}
          error={errors.constructionYear}
        />
        <div className="md:col-span-2">
          <BuildingAreaInput
            value={buildingArea}
            onChange={onBuildingAreaChange}
            error={errors.buildingArea}
          />
        </div>
      </div>
    </div>
  );
};
```

### 3.4 Container層実装例

```typescript
// src/container/SimulationFormContainer.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { SimulationInput } from '@/domain/simulation/simulationService';
import { useSimulationStore } from '@/store/useSimulationStore';
import { PropertyInformationForm } from '@/components/organism/PropertyInformationForm';

export type SimulationFormContainerProps = {
  children?: React.ReactNode;
};

/**
 * シミュレーションフォームのContainer
 * フォーム状態管理とZustand連携を担当
 */
export const SimulationFormContainer: React.FC<SimulationFormContainerProps> = () => {
  const { input, setInput, runSimulation } = useSimulationStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<SimulationInput>({
    defaultValues: input,
  });

  // フォーム値の変更をZustandに同期
  const watchedValues = watch();
  React.useEffect(() => {
    setInput(watchedValues);
  }, [watchedValues, setInput]);

  const onSubmit = (data: SimulationInput) => {
    setInput(data);
    runSimulation();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <PropertyInformationForm
        propertyPrice={input.propertyPrice}
        surfaceYield={input.surfaceYield}
        structure={input.structure}
        constructionYear={input.constructionYear}
        buildingArea={input.buildingArea}
        onPropertyPriceChange={(value) => setValue('propertyPrice', value)}
        onSurfaceYieldChange={(value) => setValue('surfaceYield', value)}
        onStructureChange={(value) => setValue('structure', value)}
        onConstructionYearChange={(value) => setValue('constructionYear', value)}
        onBuildingAreaChange={(value) => setValue('buildingArea', value)}
        errors={errors}
      />

      {/* 他のフォームセクション */}

      <div className="flex justify-center space-x-4">
        <button type="submit" className="btn-primary">
          シミュレーション実行
        </button>
      </div>
    </form>
  );
};
```

---

## 4. スタイリング規則

### 4.1 Tailwind CSS クラス定義

```css
/* src/app/globals.css */

/* カード */
.card {
  @apply bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6;
}

/* セクションタイトル */
.section-title {
  @apply text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200;
}

/* ボタン */
.btn-primary {
  @apply bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2;
}

.btn-secondary {
  @apply bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2;
}

.btn-danger {
  @apply bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2;
}

/* 入力フィールド */
.input-field {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200;
}

.select-field {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-colors duration-200;
}

/* エラー表示 */
.error-text {
  @apply text-red-600 text-sm mt-1;
}

/* ラベル */
.label {
  @apply block text-sm font-medium text-gray-700 mb-1;
}

.label-required::after {
  content: ' *';
  @apply text-red-500;
}

/* アニメーション */
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* レスポンシブグリッド */
.responsive-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6;
}

/* メトリックカード */
.metric-card {
  @apply bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4;
}

.metric-value {
  @apply text-2xl font-bold text-blue-800;
}

.metric-label {
  @apply text-sm text-blue-600 font-medium;
}
```

### 4.2 レスポンシブデザイン

```typescript
// レスポンシブ対応のクラス例
const responsiveClasses = {
  container: 'container mx-auto px-4 sm:px-6 lg:px-8',
  grid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6',
  text: 'text-sm sm:text-base lg:text-lg',
  padding: 'p-4 sm:p-6 lg:p-8',
  margin: 'm-2 sm:m-4 lg:m-6',
};
```

---

## 5. バリデーション規則

### 5.1 React Hook Form バリデーション

```typescript
// バリデーションルール定義
export const validationRules = {
  propertyPrice: {
    required: '物件価格は必須です',
    min: { value: 100, message: '物件価格は100万円以上で入力してください' },
    max: { value: 100000, message: '物件価格は10億円以下で入力してください' },
  },
  surfaceYield: {
    required: '表面利回りは必須です',
    min: { value: 0.1, message: '表面利回りは0.1%以上で入力してください' },
    max: { value: 50, message: '表面利回りは50%以下で入力してください' },
  },
  interestRate: {
    required: '金利は必須です',
    min: { value: 0.1, message: '金利は0.1%以上で入力してください' },
    max: { value: 20, message: '金利は20%以下で入力してください' },
  },
  loanTerm: {
    required: '借入期間は必須です',
    min: { value: 1, message: '借入期間は1年以上で入力してください' },
    max: { value: 50, message: '借入期間は50年以下で入力してください' },
  },
};

// 使用例
const { register } = useForm<SimulationInput>();

<input
  {...register('propertyPrice', validationRules.propertyPrice)}
  className="input-field"
/>
```

---

## 6. Recharts実装例

### 6.1 基本的なチャートコンポーネント

```typescript
// src/components/organism/CashFlowChart.tsx
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ChartData } from '@/types/chart';

export type CashFlowChartProps = {
  data: ChartData[];
  loading?: boolean;
  height?: number;
};

export const CashFlowChart: React.FC<CashFlowChartProps> = ({
  data,
  loading = false,
  height = 400,
}) => {
  if (loading) {
    return (
      <div className="card">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className={`h-${height} bg-gray-200 rounded`}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="section-title">キャッシュフロー推移</h3>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            label={{ value: '年', position: 'insideBottom', offset: -5 }}
          />
          <YAxis
            label={{ value: '金額（万円）', angle: -90, position: 'insideLeft' }}
            tickFormatter={(value) => `${value.toLocaleString()}`}
          />
          <Tooltip
            formatter={(value: number) => [`${value.toLocaleString()}万円`, 'キャッシュフロー']}
            labelFormatter={(label) => `${label}年目`}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#2563eb"
            strokeWidth={2}
            dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
```

---

## 7. Ladle ストーリー例

### 7.1 Atom ストーリー

```typescript
// src/stories/atoms/Button.stories.tsx
import type { Story } from '@ladle/react';
import { Button, ButtonProps } from '@/components/atoms/Button';

export const Primary: Story<ButtonProps> = (args) => <Button {...args} />;
Primary.args = {
  children: 'プライマリボタン',
  variant: 'primary',
};

export const Secondary: Story<ButtonProps> = (args) => <Button {...args} />;
Secondary.args = {
  children: 'セカンダリボタン',
  variant: 'secondary',
};

export const Disabled: Story<ButtonProps> = (args) => <Button {...args} />;
Disabled.args = {
  children: '無効ボタン',
  variant: 'primary',
  disabled: true,
};
```

### 7.2 Molecule ストーリー

```typescript
// src/stories/molecules/PropertyPriceInput.stories.tsx
import type { Story } from '@ladle/react';
import { PropertyPriceInput, PropertyPriceInputProps } from '@/components/molecules/PropertyPriceInput';

export const Default: Story<PropertyPriceInputProps> = (args) => (
  <PropertyPriceInput {...args} />
);
Default.args = {
  value: 30000000, // 3000万円
  onChange: (value) => console.log('価格変更:', value),
};

export const WithError: Story<PropertyPriceInputProps> = (args) => (
  <PropertyPriceInput {...args} />
);
WithError.args = {
  value: 0,
  onChange: (value) => console.log('価格変更:', value),
  error: '物件価格は必須です',
};
```

---

## 8. テスト実装例

### 8.1 Atom テスト

```typescript
// src/components/atoms/__tests__/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  it('正常にレンダリングされる', () => {
    render(<Button>テストボタン</Button>);
    expect(screen.getByRole('button', { name: 'テストボタン' })).toBeInTheDocument();
  });

  it('クリックイベントが発火する', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>クリック</Button>);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disabled状態で無効化される', () => {
    render(<Button disabled>無効ボタン</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### 8.2 Container テスト

```typescript
// src/container/__tests__/SimulationFormContainer.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SimulationFormContainer } from '../SimulationFormContainer';
import { useSimulationStore } from '@/store/useSimulationStore';

// Zustand store をモック
jest.mock('@/store/useSimulationStore');

describe('SimulationFormContainer', () => {
  const mockSetInput = jest.fn();
  const mockRunSimulation = jest.fn();

  beforeEach(() => {
    (useSimulationStore as jest.Mock).mockReturnValue({
      input: {
        propertyPrice: 30000000,
        surfaceYield: 5,
        // ... 他の初期値
      },
      setInput: mockSetInput,
      runSimulation: mockRunSimulation,
    });
  });

  it('フォーム送信時にシミュレーションが実行される', async () => {
    render(<SimulationFormContainer />);

    const submitButton = screen.getByRole('button', { name: 'シミュレーション実行' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockRunSimulation).toHaveBeenCalled();
    });
  });
});
```

---

## 9. パフォーマンス最適化

### 9.1 React.memo 使用例

```typescript
// メモ化されたコンポーネント
export const PropertyPriceInput = React.memo<PropertyPriceInputProps>(
  ({ value, onChange, error }) => {
    // コンポーネント実装
  }
);

// カスタム比較関数
export const MetricCard = React.memo<MetricCardProps>(
  ({ title, value, unit, change }) => {
    // コンポーネント実装
  },
  (prevProps, nextProps) => {
    return prevProps.value === nextProps.value && prevProps.change === nextProps.change;
  }
);
```

### 9.2 useMemo/useCallback 使用例

```typescript
// Container層での最適化
export const SimulationResultContainer: React.FC = () => {
  const { results } = useSimulationStore();

  // 重い計算のメモ化
  const chartData = useMemo(() => {
    return results.annualBalances.map((item, index) => ({
      year: item.year,
      value: item.value / 10000, // 万円に変換
      label: `${item.year}年目`,
    }));
  }, [results.annualBalances]);

  // コールバック関数のメモ化
  const handleDataRefresh = useCallback(() => {
    // データ更新処理
  }, []);

  return (
    <CashFlowChart data={chartData} onRefresh={handleDataRefresh} />
  );
};
```

---

## 10. エラーハンドリング

### 10.1 エラーバウンダリ

```typescript
// src/components/ErrorBoundary.tsx
import React from 'react';

type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
};

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('エラーバウンダリでキャッチ:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="card bg-red-50 border-red-200">
          <h2 className="text-red-800 font-semibold mb-2">
            エラーが発生しました
          </h2>
          <p className="text-red-600">
            申し訳ございませんが、予期しないエラーが発生しました。
            ページを再読み込みしてお試しください。
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary mt-4"
          >
            ページを再読み込み
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

---

## 11. アクセシビリティ対応

### 11.1 ARIA属性とキーボードナビゲーション

```typescript
// アクセシブルなフォーム入力
export const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  error,
  ...props
}) => {
  return (
    <div>
      <input
        type="number"
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        aria-describedby={error ? `${props.id}-error` : undefined}
        className="input-field"
        {...props}
      />
      {error && (
        <p id={`${props.id}-error`} role="alert" className="error-text">
          {error}
        </p>
      )}
    </div>
  );
};

// キーボードナビゲーション対応
export const Button: React.FC<ButtonProps> = ({ children, onClick, ...props }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <button
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className="btn-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    >
      {children}
    </button>
  );
};
```

---

## 12. 実装時のチェックリスト

### 12.1 コンポーネント作成時

- [ ] TypeScript型定義を明確に記述
- [ ] JSDocコメントを追加
- [ ] Props のデフォルト値を設定
- [ ] エラーハンドリングを実装
- [ ] アクセシビリティ属性を追加
- [ ] レスポンシブデザインに対応
- [ ] Tailwind CSSクラスを使用
- [ ] 対応するテストファイルを作成
- [ ] Ladleストーリーを作成

### 12.2 Container作成時

- [ ] Zustand store との連携を実装
- [ ] React Hook Form との連携を実装
- [ ] エラーハンドリングを実装
- [ ] パフォーマンス最適化（memo, useMemo, useCallback）
- [ ] 型安全性を確保
- [ ] 単体テストを作成

### 12.3 最終確認

- [ ] ESLint エラーがないことを確認
- [ ] Prettier フォーマットが適用されていることを確認
- [ ] TypeScript コンパイルエラーがないことを確認
- [ ] テストが全て通ることを確認
- [ ] Ladle でコンポーネントが正常に表示されることを確認
- [ ] 実際のブラウザで動作確認

このリ
