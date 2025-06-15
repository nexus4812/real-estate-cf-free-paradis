import type { Story } from '@ladle/react';
import { Badge, BadgeProps } from '@/components/atoms/Badge';

export const Default: Story<BadgeProps> = (args) => <Badge {...args} />;
Default.args = {
  children: 'デフォルト',
  variant: 'default',
};

export const Primary: Story<BadgeProps> = (args) => <Badge {...args} />;
Primary.args = {
  children: 'プライマリ',
  variant: 'primary',
};

export const Success: Story<BadgeProps> = (args) => <Badge {...args} />;
Success.args = {
  children: '成功',
  variant: 'success',
};

export const Warning: Story<BadgeProps> = (args) => <Badge {...args} />;
Warning.args = {
  children: '警告',
  variant: 'warning',
};

export const Danger: Story<BadgeProps> = (args) => <Badge {...args} />;
Danger.args = {
  children: '危険',
  variant: 'danger',
};

export const Small: Story<BadgeProps> = (args) => <Badge {...args} />;
Small.args = {
  children: '小サイズ',
  variant: 'primary',
  size: 'sm',
};

export const Large: Story<BadgeProps> = (args) => <Badge {...args} />;
Large.args = {
  children: '大サイズ',
  variant: 'primary',
  size: 'lg',
};
