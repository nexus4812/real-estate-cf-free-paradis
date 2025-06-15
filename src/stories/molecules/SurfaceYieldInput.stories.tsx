import type { Story } from '@ladle/react';
import { SurfaceYieldInput, SurfaceYieldInputProps } from '@/components/molecules/SurfaceYieldInput';

export const Default: Story<SurfaceYieldInputProps> = (args) => (
  <SurfaceYieldInput {...args} />
);
Default.args = {
  value: 5,
  onChange: (value) => console.log('表面利回り変更:', value),
};

export const WithError: Story<SurfaceYieldInputProps> = (args) => (
  <SurfaceYieldInput {...args} />
);
WithError.args = {
  value: 0,
  onChange: (value) => console.log('表面利回り変更:', value),
  error: '表面利回りは必須です',
};
