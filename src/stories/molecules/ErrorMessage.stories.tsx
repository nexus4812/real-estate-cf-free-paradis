import type { Story } from '@ladle/react';
import { ErrorMessage, ErrorMessageProps } from '@/components/molecules/ErrorMessage';

export const Default: Story<ErrorMessageProps> = (args) => (
  <div className="w-96">
    <ErrorMessage {...args} />
  </div>
);
Default.args = {
  message: '入力内容に誤りがあります。',
  type: 'error',
};

export const Warning: Story<ErrorMessageProps> = (args) => (
  <div className="w-96">
    <ErrorMessage {...args} />
  </div>
);
Warning.args = {
  message: '一部の項目が未入力です。',
  type: 'warning',
};

export const Info: Story<ErrorMessageProps> = (args) => (
  <div className="w-96">
    <ErrorMessage {...args} />
  </div>
);
Info.args = {
  message: 'シミュレーションが完了しました。',
  type: 'info',
};
