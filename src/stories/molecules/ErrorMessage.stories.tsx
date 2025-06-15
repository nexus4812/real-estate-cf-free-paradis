import type { Story } from '@ladle/react';
import { ErrorMessage, ErrorMessageProps } from '@/components/molecules/ErrorMessage';

export const Default: Story<ErrorMessageProps> = (args) => (
  <ErrorMessage {...args} />
);
Default.args = {
  message: 'エラーが発生しました。入力内容を確認してください。',
};

export const WarningType: Story<ErrorMessageProps> = (args) => (
  <ErrorMessage {...args} />
);
WarningType.args = {
  message: '警告: 一部のデータが不足しています。',
  type: 'warning',
};

export const InfoType: Story<ErrorMessageProps> = (args) => (
  <ErrorMessage {...args} />
);
InfoType.args = {
  message: '情報: シミュレーションが完了しました。',
  type: 'info',
};
