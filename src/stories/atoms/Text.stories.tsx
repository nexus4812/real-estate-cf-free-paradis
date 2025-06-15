import type { Story } from '@ladle/react';
import { Text, TextProps } from '@/components/atoms/Text';

export const Default: Story<TextProps> = (args) => <Text {...args} />;
Default.args = {
  children: 'これはデフォルトのテキストです。',
};

export const SmallText: Story<TextProps> = (args) => <Text {...args} />;
SmallText.args = {
  children: 'これは小さいテキストです。',
  size: 'sm',
};

export const LargeText: Story<TextProps> = (args) => <Text {...args} />;
LargeText.args = {
  children: 'これは大きいテキストです。',
  size: 'lg',
};

export const BlueText: Story<TextProps> = (args) => <Text {...args} />;
BlueText.args = {
  children: 'これは青いテキストです。',
  color: 'blue',
};

export const BoldText: Story<TextProps> = (args) => <Text {...args} />;
BoldText.args = {
  children: 'これは太字のテキストです。',
  weight: 'bold',
};

export const CenterAligned: Story<TextProps> = (args) => <Text {...args} />;
CenterAligned.args = {
  children: 'これは中央揃えのテキストです。',
  align: 'center',
};
