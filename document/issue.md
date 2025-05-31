# 不動産投資シミュレーション機能改修レビュー結果

`document/DESIGN_AND_MILESTONES.md` に基づき、現在の実装状況をレビューしました。
以下に確認された問題点、確認事項、および改善提案を記載します。

## フェーズ 3: 入力コンポーネントの修正 (タスク 3.1, 3.2, 3.3)

### 1. 入力コンポーネントの配置と責務 (`src/app/simulation/page.tsx`)

- [ ] **問題/確認事項**:
  - `PropertyInformation` コンポーネントが物件関連情報の一部のみを扱い、融資条件・収入条件・支出条件に関する入力コンポーネント群 (`SelfFundsInput`, `InterestRateInput`, `AnnualIncomeInput` など) が `src/app/simulation/page.tsx` に直接配置されています。
  - `DESIGN_AND_MILESTONES.md` の 2.2 では「入力コンポーネント (`src/components/molecules/*Input.tsx`, `src/components/organism/PropertyInformation.tsx`)」とあり、`PropertyInformation.tsx` がより広範な入力を担当するようにも解釈できます。
- [ ] **提案**:
  - `PropertyInformation` の責務範囲を明確にし、必要であれば融資条件、収入条件、支出条件をそれぞれ別のオーガニズムコンポーネント（例: `LoanConditionInformation`, `IncomeStrategyInformation`, `CostStrategyInformation`）として設計し、`page.tsx` を整理することを検討してください。
  - もしくは、`PropertyInformation` が全ての物件関連入力（融資、収入、支出戦略含む）を内包するように修正し、`page.tsx` からは `PropertyInformation` のみを呼び出す形も考えられます。

### 2. 価格関連フィールドの整合性 (`SimulationInput` と各価格入力コンポーネント)

- [ ] **問題/確認事項**:
  - UI 上では `propertyPrice` (物件総額), `landPrice` (土地価格), `buildingPrice` (建物価格) の 3 つが入力可能です。
  - ドメインモデル (`Property`) は `landPrice` と `buildingPrice` を使用します。
  - `SimulationInput` にはこれら 3 つ全てが含まれています。
  - 現状、`landPrice + buildingPrice === propertyPrice` であることを保証するバリデーションやユーザーへのフィードバック機構が見当たりません。
- [ ] **提案**:
  - ユーザーがこれらの価格を入力する際の UX を考慮し、例えば `propertyPrice` を入力したら `landPrice` と `buildingPrice` に自動按分する、あるいは `landPrice` と `buildingPrice` を入力したら `propertyPrice` が自動計算されるなどの補助機能や、三者の整合性が取れていない場合に警告を出すバリデーションの追加を検討してください。

### 3. バリデーションルールの網羅性 (各 `*Input.tsx` コンポーネント)

- [ ] **問題/確認事項**:
  - 各入力コンポーネントには基本的なバリデーション（必須入力、数値範囲など）が設定されています。
  - しかし、ドメインモデルのより詳細な制約（例: ローン期間と築年数の関係、利回りの現実的な範囲など）に基づいた複合的なバリデーションは現状見当たりません。
- [ ] **提案**:
  - `DESIGN_AND_MILESTONES.md` のタスク 3.3「各入力コンポーネントのバリデーションルールを、新しいドメインモデルの要件に合わせて更新する」に基づき、ドメイン知識を反映したより詳細なバリデーションルールを検討・追加してください。React Hook Form の `validate` 関数や、外部バリデーションライブラリ（Zod など）の導入も有効です。

### 4. 物件構造の選択肢 (`src/components/molecules/StructureInput.tsx`)

- [ ] **問題/確認事項**:
  - `StructureInput.tsx` の `structureOptions` に `SRC` (鉄骨鉄筋コンクリート造) が含まれていません。
  - ドメインモデルの `src/domain/property/buildingStructure.ts` の `allBuildingStructures` には `SRC` が定義されています。
- [ ] **提案**:
  - UI 上の選択肢として `SRC` を提供する必要があるか確認し、必要であれば `structureOptions` に追加してください。

### 5. `SimulationResult` コンポーネントの状況 (`src/app/simulation/page.tsx`)

- [ ] **問題/確認事項**:
  - `src/app/simulation/page.tsx` 内で `SimulationResult` コンポーネントがコメントアウトされています。
- [ ] **提案**:
  - このコンポーネントが不要であれば削除、必要であればコメントアウトを解除し、実装と動作確認を行ってください。

## フェーズ 4: グラフ表示コンポーネントの連携確認 (タスク 4.1, 4.2, 4.3)

### 6. シミュレーション期間の扱い (`src/components/organism/SimulationChart.tsx`)

- [ ] **問題/確認事項**:
  - `SimulationChart.tsx` 内で `SIMULATION_YEARS` が固定値 (35 年) として定義されています。
  - 一方、`src/store/usePropertyStore.ts` の `runSimulation` では、シミュレーション期間が `Math.max(input.loanTerm, 35)` で動的に決定されます。
  - これにより、グラフの減価償却終了年の表示 (`depreciationEndYear`) などに影響が出る可能性があります。
- [ ] **提案**:
  - `SimulationChart.tsx` でも、ストアから実際のシミュレーション期間（または `results` のデータ長）を取得し、それに基づいてグラフを描画・計算するように修正してください。例えば、`results.annualBalances.length` をシミュレーション期間として利用できます。

### 7. グラフの Y 軸スケール (`src/components/organism/SimulationChart.tsx`)

- [ ] **問題/確認事項**:
  - 金額データ (年間収支、累積 CF) と割合データ (表面利回り、実質利回り) が、同じ `万` 単位のフォーマッタが適用された Y 軸 (`yAxisId="right"`) に一部混在して割り当てられています。
  - これにより、スケールの違いから利回りのグラフが見えにくくなる可能性があります。
- [ ] **提案**:
  - 利回り専用の Y 軸を設け、適切なフォーマッタ（例: `%`表示）を適用することを検討してください。Recharts では複数の Y 軸を設定可能です。

## その他

### 8. エラーハンドリング (`src/store/usePropertyStore.ts`)

- [ ] **問題/確認事項**:
  - `runSimulation` アクション内に、ドメイン計算時のエラーを捕捉する明示的な `try-catch` ブロックなどが見当たりません。
  - `DESIGN_AND_MILESTONES.md` の「4. その他考慮事項」でもエラーハンドリングが挙げられています。
- [ ] **提案**:
  - ドメイン計算中に不正な入力値や予期せぬ状況でエラーが発生した場合に備え、`runSimulation` 内にエラーハンドリング処理を追加し、必要に応じてユーザーにフィードバック（例: エラートースト表示、結果表示エリアにエラーメッセージ）を行う仕組みを検討してください。

### 9. 計算ロジックの重複の可能性 (`src/components/molecules/AnnualIncomeInput.tsx`)

- [ ] **問題/確認事項**:
  - `AnnualIncomeInput.tsx` (表示専用コンポーネント) 内で、初年度年間収入を計算するために `Property` および `PropertyIncome` インスタンスを生成し計算を行っています。
  - この計算ロジックは `usePropertyStore.ts` の `runSimulation` 内のロジックと一部類似しています。
- [ ] **提案**:
  - 表示目的であっても、ドメイン計算は極力ストアやドメイン層に集約することを検討してください。例えば、ストアに初年度年間収入を計算して保持するセレクタや状態を追加し、コンポーネントはそれを購読する形などが考えられます。ただし、入力値の変更にリアルタイムで追従表示するための現在の実装が意図通りであれば、その旨をコメント等で明記しておくと良いでしょう。

### 10. Steel 構造の耐用年数の扱い (`src/domain/property/buildingStructure.ts`)

- [ ] **確認事項 (直接的なバグではない)**:
  - `Steel` クラスの `getDepreciationYears` は現状 34 年に固定されていますが、コメントには「骨格材の厚み(mm)。4mm 超なら 34 年、3mm 超 4mm 以下なら 27 年、3mm 以下なら 19 年ではあるが、一旦大半が 4mm 以上なので 34 とする」と記載があります。
- [ ] **提案**:
  - 将来的に鉄骨の厚みをユーザー入力とし、耐用年数をより正確に計算する可能性がある場合、この固定値は暫定的なものであることをチーム内で共有し、ドキュメント等にも明記しておくと良いでしょう。

以上、ご確認をお願いいたします。
