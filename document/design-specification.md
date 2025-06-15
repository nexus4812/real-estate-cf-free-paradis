# 不動産投資シミュレーター 設計仕様書

## プロジェクト概要

不動産投資のキャッシュフロー、利回り、税引前収益などを計算・可視化するWebアプリケーション。
Atomic Design + Container/Presentational パターンを採用し、責務を明確に分離した拡張性の高い構造を実現する。

## 技術スタック

- **フレームワーク**: Next.js 15 (App Router)
- **言語**: TypeScript
- **状態管理**: Zustand
- **フォーム**: React Hook Form
- **グラフ描画**: Recharts
- **スタイリング**: Tailwind CSS
- **UI設計**: Atomic Design (molecules, organism まで)
- **ドキュメント**: Ladle

## アーキテクチャ概要

```
┌─────────────────┐
│   Page Layer    │ ← ルーティング単位、Containerの注入
├─────────────────┤
│ Container Layer │ ← 状態管理、ビジネスロジック
├─────────────────┤
│ Organism Layer  │ ← 表示用の高度なUIブロック
├─────────────────┤
│ Molecule Layer  │ ← 表示用のUI部品
├─────────────────┤
│  Atom Layer     │ ← 最小構成のUIパーツ
├─────────────────┤
│  Store Layer    │ ← Zustand状態管理 (実装済み)
├─────────────────┤
│ Domain Layer    │ ← ビジネスロジック (実装済み)
└─────────────────┘
```

## 責務分離ルール

| 層            | ストアアクセス | 副作用 | ビジネスロジック | 責務                                |
| ------------- | -------------- | ------ | ---------------- | ----------------------------------- |
| **Page**      | 許可           | 許可   | 禁止             | ルーティング、Containerの注入       |
| **Container** | 許可           | 許可   | 許可             | 状態管理、ユースケース、propsの準備 |
| **Organism**  | 禁止           | 禁止   | 禁止             | 表示構造、複数Moleculeの組み合わせ  |
| **Molecule**  | 禁止           | 禁止   | 禁止             | 小規模UI部品、propsのみで完結       |
| **Atom**      | 禁止           | 禁止   | 禁止             | 最小単位部品、完全に見た目のみ      |

## 実装済み要素

### Domain Layer (完了)

- `property/`: 物件情報、建物構造
- `propertyIncome/`: 収入計算
- `propertyCost/`: 支出計算、ローン
- `financial-plan/`: 収支計算
- `simulation/`: シミュレーション実行

### Store Layer (完了)

- `useSimulationStore`: シミュレーション状態管理

## 実装対象コンポーネント

### 1. Atom Layer (最小UI部品)

#### 1.1 Input系Atom

- `NumberInput`: 数値入力フィールド
- `SelectInput`: セレクトボックス
- `TextInput`: テキスト入力フィールド
- `Button`: ボタン
- `Label`: ラベル

#### 1.2 Display系Atom

- `Text`: テキスト表示
- `Badge`: バッジ表示
- `Icon`: アイコン
- `Card`: カード枠

### 2. Molecule Layer (UI部品)

#### 2.1 Form系Molecule

- `PropertyPriceInput`: 物件価格入力
- `SurfaceYieldInput`: 表面利回り入力
- `StructureSelect`: 建物構造選択
- `ConstructionYearInput`: 築年数入力
- `BuildingAreaInput`: 建物面積入力
- `SelfFundsInput`: 自己資金入力
- `InterestRateInput`: 金利入力
- `LoanTermInput`: 借入期間入力
- `VacancyRateInput`: 空室率入力
- `RentIncreaseRateInput`: 家賃上昇率入力
- `ManagementFeeRatioInput`: 管理費率入力
- `RepairCostRatioInput`: 修繕費率入力

#### 2.2 Display系Molecule

- `MetricCard`: 指標表示カード
- `ResultSummary`: 結果サマリー
- `ErrorMessage`: エラーメッセージ
- `LoadingSpinner`: ローディング表示

### 3. Organism Layer (表示構造)

#### 3.1 Form系Organism

- `PropertyInformationForm`: 物件情報入力フォーム
- `LoanConditionForm`: 融資条件入力フォーム
- `IncomeConditionForm`: 収入条件入力フォーム
- `CostConditionForm`: 支出条件入力フォーム

#### 3.2 Result系Organism

- `SimulationResultPanel`: シミュレーション結果表示
- `CashFlowChart`: キャッシュフローグラフ
- `YieldChart`: 利回りグラフ
- `MetricsDashboard`: 指標ダッシュボード

### 4. Container Layer (ロジック)

#### 4.1 Form Container

- `SimulationFormContainer`: フォーム状態管理
- `ValidationContainer`: バリデーション処理

#### 4.2 Result Container

- `SimulationResultContainer`: 結果表示制御
- `ChartDataContainer`: グラフデータ準備

### 5. Page Layer (ルーティング)

#### 5.1 Pages

- `app/simulation/page.tsx`: シミュレーションページ (一部実装済み)
- `app/page.tsx`: トップページ

## データフロー

```
Page → Container → Organism → Molecule → Atom
  ↓       ↓
Store ← Domain
```

1. **Page**: Containerを注入し、ルーティングを管理
2. **Container**: Storeからデータを取得し、Organismにpropsとして渡す
3. **Organism**: 複数のMoleculeを組み合わせて表示構造を作る
4. **Molecule**: Atomを組み合わせてUI部品を作る
5. **Atom**: 最小単位のUI要素

## 型定義

### Props型

```typescript
// Atom Props
export type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
};

// Molecule Props
export type PropertyPriceInputProps = {
  value: number;
  onChange: (value: number) => void;
  error?: string;
};

// Organism Props
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
```

## スタイリング方針

### Tailwind CSS クラス設計

```css
/* カード */
.card {
  @apply bg-white rounded-lg shadow-md border border-gray-200 p-6;
}

/* ボタン */
.btn-primary {
  @apply bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors;
}

.btn-secondary {
  @apply bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors;
}

/* 入力フィールド */
.input-field {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent;
}

/* エラー表示 */
.error-text {
  @apply text-red-600 text-sm mt-1;
}
```

## テスト方針

### 各層のテスト対象

- **Atom**: スナップショットテスト、Props渡しテスト
- **Molecule**: ユーザーインタラクションテスト
- **Organism**: 統合表示テスト
- **Container**: ロジックテスト、Store連携テスト
- **Page**: E2Eテスト

## Ladle ストーリー

各コンポーネントのストーリーを `src/stories/` に配置:

```
src/stories/
├── atoms/
│   ├── Button.stories.tsx
│   ├── NumberInput.stories.tsx
│   └── ...
├── molecules/
│   ├── PropertyPriceInput.stories.tsx
│   ├── MetricCard.stories.tsx
│   └── ...
└── organisms/
    ├── PropertyInformationForm.stories.tsx
    ├── SimulationResultPanel.stories.tsx
    └── ...
```

## パフォーマンス考慮事項

1. **React.memo**: Organism以下のコンポーネントで適用
2. **useMemo**: 重い計算処理のメモ化
3. **useCallback**: Container層でのコールバック関数メモ化
4. **Code Splitting**: ページ単位での動的インポート

## 拡張性考慮事項

1. **新しい入力項目**: Molecule層に新しいInput系コンポーネントを追加
2. **新しい表示項目**: Organism層に新しい表示コンポーネントを追加
3. **新しいページ**: Page層とContainer層を追加
4. **新しいビジネスロジック**: Domain層に追加し、Container層で利用
