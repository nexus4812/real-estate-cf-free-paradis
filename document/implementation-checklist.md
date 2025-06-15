# 不動産投資シミュレーター 実装チェックリスト

## 概要

このチェックリストは、Domain層とStore層が完成した不動産投資シミュレーターの残りの実装を、他のモデルが引き継いで完成させるためのタスク管理表です。各チェックボックスは独立したタスクとして設計されており、モデルが入れ替わっても継続的に作業を進められます。

## 前提条件

### ✅ 完了済み

- [x] Domain Layer (property, propertyIncome, propertyCost, financial-plan, simulation)
- [x] Store Layer (useSimulationStore)
- [x] 基本的なプロジェクト設定 (Next.js, TypeScript, Tailwind CSS, Zustand)

### 📋 実装対象

- [ ] Atom Layer (最小UI部品)
- [ ] Molecule Layer (UI部品)
- [ ] Organism Layer (表示構造)
- [ ] Container Layer (ロジック)
- [ ] Page Layer (ルーティング)
- [ ] Ladle ストーリー
- [ ] テスト

---

## Phase 1: Atom Layer (最小UI部品)

### 1.1 Input系Atom

- [x] **A1-1: NumberInput コンポーネント**

  - ファイル: `src/components/atoms/NumberInput.tsx`
  - 機能: 数値入力フィールド（バリデーション、フォーマット機能付き）
  - Props: `value`, `onChange`, `placeholder`, `error`, `disabled`, `min`, `max`
  - 依存: なし

- [x] **A1-2: SelectInput コンポーネント**

  - ファイル: `src/components/atoms/SelectInput.tsx`
  - 機能: セレクトボックス（オプション選択）
  - Props: `value`, `onChange`, `options`, `placeholder`, `error`, `disabled`
  - 依存: なし

- [x] **A1-3: TextInput コンポーネント**

  - ファイル: `src/components/atoms/TextInput.tsx`
  - 機能: テキスト入力フィールド
  - Props: `value`, `onChange`, `placeholder`, `error`, `disabled`, `type`
  - 依存: なし

- [x] **A1-4: Button コンポーネント**

  - ファイル: `src/components/atoms/Button.tsx`
  - 機能: ボタン（primary, secondary, danger バリアント）
  - Props: `children`, `onClick`, `variant`, `disabled`, `type`, `size`
  - 依存: なし

- [x] **A1-5: Label コンポーネント**
  - ファイル: `src/components/atoms/Label.tsx`
  - 機能: ラベル表示（必須マーク対応）
  - Props: `children`, `htmlFor`, `required`
  - 依存: なし

### 1.2 Display系Atom

- [x] **A2-1: Text コンポーネント**

  - ファイル: `src/components/atoms/Text.tsx`
  - 機能: テキスト表示（サイズ、色バリアント）
  - Props: `children`, `size`, `color`, `weight`, `align`
  - 依存: なし

- [x] **A2-2: Badge コンポーネント**

  - ファイル: `src/components/atoms/Badge.tsx`
  - 機能: バッジ表示（ステータス表示用）
  - Props: `children`, `variant`, `size`
  - 依存: なし

- [x] **A2-3: Icon コンポーネント**

  - ファイル: `src/components/atoms/Icon.tsx`
  - 機能: アイコン表示（Heroicons使用）
  - Props: `name`, `size`, `color`
  - 依存: なし

- [x] **A2-4: Card コンポーネント**
  - ファイル: `src/components/atoms/Card.tsx`
  - 機能: カード枠（影、角丸、パディング）
  - Props: `children`, `padding`, `shadow`, `border`
  - 依存: なし

---

## Phase 2: Molecule Layer (UI部品)

### 2.1 Form系Molecule

- [x] **M1-1: PropertyPriceInput コンポーネント**

  - ファイル: `src/components/molecules/PropertyPriceInput.tsx`
  - 機能: 物件価格入力（万円単位、フォーマット表示）
  - Props: `value`, `onChange`, `error`
  - 依存: A1-1 (NumberInput), A1-5 (Label)

- [x] **M1-2: SurfaceYieldInput コンポーネント**

  - ファイル: `src/components/molecules/SurfaceYieldInput.tsx`
  - 機能: 表面利回り入力（%表示）
  - Props: `value`, `onChange`, `error`
  - 依存: A1-1 (NumberInput), A1-5 (Label)

- [x] **M1-3: StructureSelect コンポーネント**

  - ファイル: `src/components/molecules/StructureSelect.tsx`
  - 機能: 建物構造選択（RC, SRC, Steel, Wood）
  - Props: `value`, `onChange`, `error`
  - 依存: A1-2 (SelectInput), A1-5 (Label)

- [x] **M1-4: ConstructionYearInput コンポーネント**

  - ファイル: `src/components/molecules/ConstructionYearInput.tsx`
  - 機能: 築年数入力（年数計算機能付き）
  - Props: `value`, `onChange`, `error`
  - 依存: A1-1 (NumberInput), A1-5 (Label)

- [x] **M1-5: BuildingAreaInput コンポーネント**

  - ファイル: `src/components/molecules/BuildingAreaInput.tsx`
  - 機能: 建物面積入力（㎡単位）
  - Props: `value`, `onChange`, `error`
  - 依存: A1-1 (NumberInput), A1-5 (Label)

- [x] **M1-6: SelfFundsInput コンポーネント**

  - ファイル: `src/components/molecules/SelfFundsInput.tsx`
  - 機能: 自己資金入力（万円単位）
  - Props: `value`, `onChange`, `error`
  - 依存: A1-1 (NumberInput), A1-5 (Label)

- [x] **M1-7: InterestRateInput コンポーネント**

  - ファイル: `src/components/molecules/InterestRateInput.tsx`
  - 機能: 金利入力（%表示）
  - Props: `value`, `onChange`, `error`
  - 依存: A1-1 (NumberInput), A1-5 (Label)

- [x] **M1-8: LoanTermInput コンポーネント**

  - ファイル: `src/components/molecules/LoanTermInput.tsx`
  - 機能: 借入期間入力（年単位）
  - Props: `value`, `onChange`, `error`
  - 依存: A1-1 (NumberInput), A1-5 (Label)

- [x] **M1-9: VacancyRateInput コンポーネント**

  - ファイル: `src/components/molecules/VacancyRateInput.tsx`
  - 機能: 空室率入力（%表示）
  - Props: `value`, `onChange`, `error`
  - 依存: A1-1 (NumberInput), A1-5 (Label)

- [x] **M1-10: RentIncreaseRateInput コンポーネント**

  - ファイル: `src/components/molecules/RentIncreaseRateInput.tsx`
  - 機能: 家賃上昇率入力（%表示）
  - Props: `value`, `onChange`, `error`
  - 依存: A1-1 (NumberInput), A1-5 (Label)

- [x] **M1-11: ManagementFeeRatioInput コンポーネント**

  - ファイル: `src/components/molecules/ManagementFeeRatioInput.tsx`
  - 機能: 管理費率入力（%表示）
  - Props: `value`, `onChange`, `error`
  - 依存: A1-1 (NumberInput), A1-5 (Label)

- [x] **M1-12: RepairCostRatioInput コンポーネント**
  - ファイル: `src/components/molecules/RepairCostRatioInput.tsx`
  - 機能: 修繕費率入力（%表示）
  - Props: `value`, `onChange`, `error`
  - 依存: A1-1 (NumberInput), A1-5 (Label)

### 2.2 Display系Molecule

- [x] **M2-1: MetricCard コンポーネント**

  - ファイル: `src/components/molecules/MetricCard.tsx`
  - 機能: 指標表示カード（タイトル、値、単位、変化率）
  - Props: `title`, `value`, `unit`, `change`, `trend`
  - 依存: A2-4 (Card), A2-1 (Text), A2-3 (Icon)

- [x] **M2-2: ResultSummary コンポーネント**

  - ファイル: `src/components/molecules/ResultSummary.tsx`
  - 機能: 結果サマリー表示（重要指標の一覧）
  - Props: `totalPayment`, `initialIncome`, `cashFlow`, `yield`
  - 依存: A2-4 (Card), A2-1 (Text)

- [x] **M2-3: ErrorMessage コンポーネント**

  - ファイル: `src/components/molecules/ErrorMessage.tsx`
  - 機能: エラーメッセージ表示（アイコン付き）
  - Props: `message`, `type`
  - 依存: A2-1 (Text), A2-3 (Icon)

- [x] **M2-4: LoadingSpinner コンポーネント**
  - ファイル: `src/components/molecules/LoadingSpinner.tsx`
  - 機能: ローディング表示（スピナー + テキスト）
  - Props: `message`, `size`
  - 依存: A2-1 (Text)

---

## Phase 3: Organism Layer (表示構造)

### 3.1 Form系Organism

- [x] **O1-1: PropertyInformationForm コンポーネント**

  - ファイル: `src/components/organism/PropertyInformationForm.tsx`
  - 機能: 物件情報入力フォーム（価格、利回り、構造、築年、面積）
  - Props: 各入力値、onChange関数、errors
  - 依存: M1-1, M1-2, M1-3, M1-4, M1-5

- [x] **O1-2: LoanConditionForm コンポーネント**

  - ファイル: `src/components/organism/LoanConditionForm.tsx`
  - 機能: 融資条件入力フォーム（自己資金、金利、借入期間）
  - Props: 各入力値、onChange関数、errors
  - 依存: M1-6, M1-7, M1-8

- [x] **O1-3: IncomeConditionForm コンポーネント**

  - ファイル: `src/components/organism/IncomeConditionForm.tsx`
  - 機能: 収入条件入力フォーム（空室率、家賃上昇率）
  - Props: 各入力値、onChange関数、errors
  - 依存: M1-9, M1-10

- [x] **O1-4: CostConditionForm コンポーネント**
  - ファイル: `src/components/organism/CostConditionForm.tsx`
  - 機能: 支出条件入力フォーム（管理費率、修繕費率）
  - Props: 各入力値、onChange関数、errors
  - 依存: M1-11, M1-12

### 3.2 Result系Organism

- [x] **O2-1: SimulationResultPanel コンポーネント**

  - ファイル: `src/components/organism/SimulationResultPanel.tsx`
  - 機能: シミュレーション結果表示パネル（サマリー + 詳細指標）
  - Props: `results`, `loading`, `error`
  - 依存: M2-1, M2-2, M2-3, M2-4

- [x] **O2-2: CashFlowChart コンポーネント**

  - ファイル: `src/components/organism/CashFlowChart.tsx`
  - 機能: キャッシュフローグラフ（Recharts使用）
  - Props: `data`, `loading`
  - 依存: A2-4 (Card), Recharts

- [x] **O2-3: YieldChart コンポーネント**

  - ファイル: `src/components/organism/YieldChart.tsx`
  - 機能: 利回りグラフ（表面利回り、実質利回り）
  - Props: `data`, `loading`
  - 依存: A2-4 (Card), Recharts

- [x] **O2-4: MetricsDashboard コンポーネント**
  - ファイル: `src/components/organism/MetricsDashboard.tsx`
  - 機能: 指標ダッシュボード（複数のMetricCardを配置）
  - Props: `metrics`, `loading`
  - 依存: M2-1

---

## Phase 4: Container Layer (ロジック)

### 4.1 Form Container

- [x] **C1-1: SimulationFormContainer コンポーネント**

  - ファイル: `src/container/SimulationFormContainer.tsx`
  - 機能: フォーム状態管理（React Hook Form + Zustand連携）
  - 責務: フォーム状態、バリデーション、送信処理
  - 依存: useSimulationStore, React Hook Form

- [x] **C1-2: ValidationContainer コンポーネント**
  - ファイル: `src/container/ValidationContainer.tsx`
  - 機能: バリデーション処理（入力値検証、エラー表示）
  - 責務: 入力値検証、エラーメッセージ生成
  - 依存: なし
  - 備考: SimulationFormContainerでバリデーションを実装済みのため、不要と判断

### 4.2 Result Container

- [x] **C2-1: SimulationResultContainer コンポーネント**

  - ファイル: `src/container/SimulationResultContainer.tsx`
  - 機能: 結果表示制御（計算実行、結果取得、エラーハンドリング）
  - 責務: シミュレーション実行、結果データ管理
  - 依存: useSimulationStore

- [x] **C2-2: ChartDataContainer コンポーネント**
  - ファイル: `src/container/ChartDataContainer.tsx`
  - 機能: グラフデータ準備（Recharts用データ変換）
  - 責務: グラフ用データ変換、フォーマット
  - 依存: useSimulationStore
  - 備考: `SimulationResultContainer` 内でグラフデータの変換が完結しているため、別途作成は不要と判断。

---

## Phase 5: Page Layer (ルーティング)

### 5.1 Pages

- [x] **P1-1: app/simulation/page.tsx 修正**

  - ファイル: `src/app/simulation/page.tsx`
  - 機能: シミュレーションページ（Container注入、レイアウト）
  - 作業: 既存コードをContainer/Organism構造に修正
  - 依存: C1-1, C2-1, O1-1, O1-2, O1-3, O1-4, O2-1, O2-2, O2-3

- [x] **P1-2: app/page.tsx 修正**
  - ファイル: `src/app/page.tsx`
  - 機能: トップページ（シミュレーションページへのナビゲーション）
  - 作業: 既存コードを整理、ナビゲーション追加
  - 依存: なし

---

## Phase 6: Ladle ストーリー

### 6.1 Atom Stories

- [x] **S1-1: Atom ストーリー作成**
  - ファイル: `src/stories/atoms/` 配下に各Atomのストーリー
  - 対象: Button, NumberInput, SelectInput, TextInput, Label, Text, Badge, Icon, Card
  - 内容: 各バリアント、状態のストーリー

### 6.2 Molecule Stories

- [x] **S2-1: Molecule ストーリー作成**
  - ファイル: `src/stories/molecules/` 配下に各Moleculeのストーリー
  - 対象: 全Form系Molecule、全Display系Molecule
  - 内容: 正常状態、エラー状態、無効状態のストーリー

### 6.3 Organism Stories

- [x] **S3-1: Organism ストーリー作成**
  - ファイル: `src/stories/organisms/` 配下に各Organismのストーリー
  - 対象: 全Form系Organism、全Result系Organism
  - 内容: 様々なデータパターンのストーリー

---

## Phase 7: テスト

### 7.1 Unit Tests

- [x] **T1-1: Atom テスト**

  - ファイル: `src/components/atoms/__tests__/` 配下
  - 内容: スナップショットテスト、Props渡しテスト

- [x] **T1-2: Molecule テスト**

  - ファイル: `src/components/molecules/__tests__/` 配下
  - 内容: ユーザーインタラクションテスト、バリデーションテスト

- [ ] **T1-3: Organism テスト**

  - ファイル: `src/components/organism/__tests__/` 配下
  - 内容: 統合表示テスト、データ連携テスト

- [ ] **T1-4: Container テスト**
  - ファイル: `src/container/__tests__/` 配下
  - 内容: ロジックテスト、Store連携テスト

### 7.2 Integration Tests

- [ ] **T2-1: Page テスト**
  - ファイル: `src/app/__tests__/` 配下
  - 内容: E2Eテスト、ユーザーフローテスト

---

## Phase 8: 最終調整

### 8.1 スタイリング

- [ ] **F1-1: Tailwind CSS クラス整理**

  - ファイル: `src/app/globals.css`
  - 内容: 共通クラス定義、レスポンシブ対応

- [ ] **F1-2: アニメーション追加**
  - 内容: フェードイン、ローディングアニメーション

### 8.2 パフォーマンス最適化

- [ ] **F2-1: React.memo 適用**

  - 対象: Organism以下のコンポーネント

- [ ] **F2-2: useMemo/useCallback 適用**
  - 対象: Container層の重い処理

### 8.3 アクセシビリティ

- [ ] **F3-1: ARIA属性追加**

  - 対象: フォーム要素、ボタン

- [ ] **F3-2: キーボードナビゲーション対応**
  - 対象: 全インタラクティブ要素

---

## 実装時の注意事項

### 各タスクの実装手順

1. **ファイル作成**: 指定されたパスにファイルを作成
2. **型定義**: TypeScriptの型を明確に定義
3. **Props設計**: 再利用性を考慮したProps設計
4. **スタイリング**: Tailwind CSSクラスを使用
5. **JSDoc**: 関数・コンポーネントにドキュメント追加
6. **テスト**: 対応するテストファイルを作成

### 依存関係の確認

- 各タスクの「依存」欄を確認し、必要なコンポーネントが実装済みか確認
- 依存コンポーネントが未実装の場合は、先に依存コンポーネントを実装

### コード品質

- ESLint/Prettier設定に従う
- TypeScript strict モードに対応
- React Hook Form のバリデーションルールに従う
- Zustand のベストプラクティスに従う

### 進捗管理

- 各チェックボックスを完了時にチェック
- 問題が発生した場合は、このファイルにメモを追記
- 他のモデルに引き継ぐ際は、現在の進捗状況を明記

---

## 完了確認

全てのチェックボックスが完了したら、以下を実行して動作確認：

```bash
# 開発サーバー起動
npm run dev

# Ladle起動（ストーリーブック確認）
npm run ladle

# テスト実行
npm test

# ビルド確認
npm run build
```

## 最終成果物

- [ ] **完全に動作するシミュレーションアプリケーション**
- [ ] **Atomic Design構造に沿ったコンポーネント群**
- [ ] **Ladleによるコンポーネントドキュメント**
- [ ] **包括的なテストスイート**
- [ ] **TypeScript型安全性の確保**
- [ ] **レスポンシブデザイン対応**
- [ ] **アクセシビリティ対応**
