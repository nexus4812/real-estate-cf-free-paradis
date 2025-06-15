import type { Story } from '@ladle/react';
import { Card, CardProps } from '@/components/atoms/Card';

export const Default: Story<CardProps> = (args) => <Card {...args} />;
Default.args = {
  children: <div className="p-4">これはデフォルトのカードです。</div>,
};

export const NoPadding: Story<CardProps> = (args) => <Card {...args} />;
NoPadding.args = {
  children: <div className="p-4">これはパディングなしのカードです。</div>,
  padding: 'none',
};

export const CustomPadding: Story<CardProps> = (args) => <Card {...args} />;
CustomPadding.args = {
  children: <div className="p-8">これはカスタムパディングのカードです。</div>,
  padding: 'lg',
};

export const NoShadow: Story<CardProps> = (args) => <Card {...args} />;
NoShadow.args = {
  children: <div className="p-4">これは影なしのカードです。</div>,
  shadow: 'none',
};

export const LargeShadow: Story<CardProps> = (args) => <Card {...args} />;
LargeShadow.args = {
  children: <div className="p-4">これは大きな影のカードです。</div>,
  shadow: 'lg',
};

export const NoBorder: Story<CardProps> = (args) => <Card {...args} />;
NoBorder.args = {
  children: <div className="p-4">これはボーダーなしのカードです。</div>,
  border: false,
};
