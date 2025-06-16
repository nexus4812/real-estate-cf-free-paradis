import { render, screen } from '@testing-library/react';
import { ResultSummary } from '../ResultSummary';

describe('ResultSummary', () => {
  const mockProps = {
    totalPayment: 5000,
    initialIncome: 100,
    cashFlow: 50,
    yield: 5.555,
  };

  it('正常にレンダリングされ、各指標が表示される', () => {
    render(<ResultSummary {...mockProps} />);

    expect(screen.getByText('シミュレーション結果サマリー')).toBeInTheDocument();

    expect(screen.getByText('総支払額')).toBeInTheDocument();
    expect(screen.getByText('5,000 万円')).toBeInTheDocument();

    expect(screen.getByText('初年度収入')).toBeInTheDocument();
    expect(screen.getByText('100 万円')).toBeInTheDocument();

    expect(screen.getByText('年間キャッシュフロー')).toBeInTheDocument();
    expect(screen.getByText('50 万円')).toBeInTheDocument();

    expect(screen.getByText('利回り')).toBeInTheDocument();
    expect(screen.getByText('5.55 %')).toBeInTheDocument(); // toFixed(2)で丸められる
  });

  it('値が0の場合も正しく表示される', () => {
    render(<ResultSummary totalPayment={0} initialIncome={0} cashFlow={0} yield={0} />);

    // 複数の "0 万円" が存在するため、getByTextではなくgetAllByTextを使用し、適切な要素を選択する
    expect(screen.getAllByText('0 万円')[0]).toBeInTheDocument(); // 総支払額
    expect(screen.getAllByText('0 万円')[1]).toBeInTheDocument(); // 初年度収入
    expect(screen.getAllByText('0 万円')[2]).toBeInTheDocument(); // 年間キャッシュフロー
    expect(screen.getByText('0.00 %')).toBeInTheDocument(); // 利回り
  });

  it('負の値も正しく表示される', () => {
    render(<ResultSummary totalPayment={-100} initialIncome={-20} cashFlow={-5} yield={-1.234} />);

    expect(screen.getByText('-100 万円')).toBeInTheDocument();
    expect(screen.getByText('-20 万円')).toBeInTheDocument();
    expect(screen.getByText('-5 万円')).toBeInTheDocument();
    expect(screen.getByText('-1.23 %')).toBeInTheDocument();
  });
});
