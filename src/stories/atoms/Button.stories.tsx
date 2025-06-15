import type { Story } from '@ladle/react';
import { Button, ButtonProps } from '@/components/atoms/Button';

export const Primary: Story<ButtonProps> = (args) => <Button {...args} />;
Primary.args = {
  children: 'プライマリボタン',
  variant: 'primary',
  size: 'md',
};

export const Secondary: Story<ButtonProps> = (args) => <Button {...args} />;
Secondary.args = {
  children: 'セカンダリボタン',
  variant: 'secondary',
  size: 'md',
};

export const Danger: Story<ButtonProps> = (args) => <Button {...args} />;
Danger.args = {
  children: '危険ボタン',
  variant: 'danger',
  size: 'md',
};

export const Small: Story<ButtonProps> = (args) => <Button {...args} />;
Small.args = {
  children: '小ボタン',
  variant: 'primary',
  size: 'sm',
};

export const Large: Story<ButtonProps> = (args) => <Button {...args} />;
Large.args = {
  children: '大ボタン',
  variant: 'primary',
  size: 'lg',
};

export const Disabled: Story<ButtonProps> = (args) => <Button {...args} />;
Disabled.args = {
  children: '無効ボタン',
  variant: 'primary',
  disabled: true,
  size: 'md',
};
