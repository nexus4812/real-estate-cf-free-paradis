import { render, screen } from '@testing-library/react';
import { ErrorMessage } from '../ErrorMessage';
import { Icon } from '@/components/atoms/Icon'; // Iconコンポーネントをインポート

// Iconコンポーネントをモック
jest.mock('@/components/atoms/Icon', () => ({
  Icon: jest.fn(({ name, size, color }) => (
    <span data-testid="mock-icon" data-name={name} data-size={size} data-color={color}>
      {name}
    </span>
  )),
}));

describe('ErrorMessage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('正常にレンダリングされ、メッセージが表示される', () => {
    render(<ErrorMessage message="テストエラーメッセージ" />);
    expect(screen.getByText('テストエラーメッセージ')).toBeInTheDocument();
  });

  it('typeがerrorの場合、正しいアイコンと色が適用される', () => {
    render(<ErrorMessage message="エラー" type="error" />);
    expect(screen.getByText('エラー')).toBeInTheDocument();
    expect(screen.getByTestId('mock-icon')).toHaveAttribute('data-name', 'ExclamationCircleIcon');
    expect(screen.getByTestId('mock-icon')).toHaveAttribute('data-color', 'red');
    expect(screen.getByRole('alert')).toHaveClass('text-red-600'); // div要素にrole="alert"を仮定
  });

  it('typeがwarningの場合、正しいアイコンと色が適用される', () => {
    render(<ErrorMessage message="警告" type="warning" />);
    expect(screen.getByText('警告')).toBeInTheDocument();
    expect(screen.getByTestId('mock-icon')).toHaveAttribute('data-name', 'ExclamationTriangleIcon');
    expect(screen.getByTestId('mock-icon')).toHaveAttribute('data-color', 'yellow');
    expect(screen.getByRole('alert')).toHaveClass('text-yellow-600');
  });

  it('typeがinfoの場合、正しいアイコンと色が適用される', () => {
    render(<ErrorMessage message="情報" type="info" />);
    expect(screen.getByText('情報')).toBeInTheDocument();
    expect(screen.getByTestId('mock-icon')).toHaveAttribute('data-name', 'InformationCircleIcon');
    expect(screen.getByTestId('mock-icon')).toHaveAttribute('data-color', 'blue');
    expect(screen.getByRole('alert')).toHaveClass('text-blue-600');
  });

  it('typeが指定されない場合、デフォルトでerrorが適用される', () => {
    render(<ErrorMessage message="デフォルトエラー" />);
    expect(screen.getByText('デフォルトエラー')).toBeInTheDocument();
    expect(screen.getByTestId('mock-icon')).toHaveAttribute('data-name', 'ExclamationCircleIcon');
    expect(screen.getByTestId('mock-icon')).toHaveAttribute('data-color', 'red');
    expect(screen.getByRole('alert')).toHaveClass('text-red-600');
  });
});
