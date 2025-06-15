import type { Story } from '@ladle/react';
import { LoadingSpinner, LoadingSpinnerProps } from '@/components/molecules/LoadingSpinner';

export const Default: Story<LoadingSpinnerProps> = (args) => (
  <div className="flex justify-center items-center h-48">
    <LoadingSpinner {...args} />
  </div>
);
Default.args = {
  message: 'データを読み込み中...',
};

export const SmallSpinner: Story<LoadingSpinnerProps> = (args) => (
  <div className="flex justify-center items-center h-48">
    <LoadingSpinner {...args} />
  </div>
);
SmallSpinner.args = {
  message: '処理中...',
  size: 'sm',
};

export const LargeSpinner: Story<LoadingSpinnerProps> = (args) => (
  <div className="flex justify-center items-center h-48">
    <LoadingSpinner {...args} />
  </div>
);
LargeSpinner.args = {
  message: 'シミュレーションを実行中...',
  size: 'lg',
};

export const NoMessage: Story<LoadingSpinnerProps> = (args) => (
  <div className="flex justify-center items-center h-48">
    <LoadingSpinner {...args} />
  </div>
);
NoMessage.args = {
  size: 'md',
};
