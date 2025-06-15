import type { Story } from '@ladle/react';
import { LoadingSpinner, LoadingSpinnerProps } from '@/components/molecules/LoadingSpinner';

export const Default: Story<LoadingSpinnerProps> = (args) => (
  <div className="w-64 h-32 flex items-center justify-center">
    <LoadingSpinner {...args} />
  </div>
);
Default.args = {
  message: 'データを読み込み中...',
  size: 'md',
};

export const Small: Story<LoadingSpinnerProps> = (args) => (
  <div className="w-64 h-32 flex items-center justify-center">
    <LoadingSpinner {...args} />
  </div>
);
Small.args = {
  message: '処理中...',
  size: 'sm',
};

export const Large: Story<LoadingSpinnerProps> = (args) => (
  <div className="w-64 h-32 flex items-center justify-center">
    <LoadingSpinner {...args} />
  </div>
);
Large.args = {
  message: 'シミュレーションを実行中...',
  size: 'lg',
};
