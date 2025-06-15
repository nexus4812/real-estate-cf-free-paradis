import type { Story } from '@ladle/react';
import { Icon, IconProps } from '@/components/atoms/Icon';

export const Default: Story<IconProps> = (args) => <Icon {...args} />;
Default.args = {
  name: 'CheckCircleIcon',
};

export const LargeIcon: Story<IconProps> = (args) => <Icon {...args} />;
LargeIcon.args = {
  name: 'CheckCircleIcon',
  size: 'lg',
};

export const BlueIcon: Story<IconProps> = (args) => <Icon {...args} />;
BlueIcon.args = {
  name: 'CheckCircleIcon',
  color: 'blue',
};

export const DifferentIcon: Story<IconProps> = (args) => <Icon {...args} />;
DifferentIcon.args = {
  name: 'ExclamationTriangleIcon',
  color: 'red',
  size: 'md',
};
