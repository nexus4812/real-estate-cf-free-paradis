import type { Story } from '@ladle/react';
import { NumberInput, NumberInputProps } from '@/components/atoms/NumberInput';

export const Default: Story<NumberInputProps> = (args) => <NumberInput {...args} />;
Default.args = {
  value: 123,
  onChange: (value) => console.log('NumberInput changed:', value),
  placeholder: '数値を入力',
  unit: '個',
};

export const WithError: Story<NumberInputProps> = (args) => <NumberInput {...args} />;
WithError.args = {
  value: 0,
  onChange: (value) => console.log('NumberInput changed:', value),
  placeholder: '数値を入力',
  error: '必須項目です',
  unit: '個',
};

export const Disabled: Story<NumberInputProps> = (args) => <NumberInput {...args} />;
Disabled.args = {
  value: 456,
  onChange: (value) => console.log('NumberInput changed:', value),
  placeholder: '数値を入力',
  disabled: true,
  unit: '個',
};

export const WithMinMax: Story<NumberInputProps> = (args) => <NumberInput {...args} />;
WithMinMax.args = {
  value: 50,
  onChange: (value) => console.log('NumberInput changed:', value),
  min: 0,
  max: 100,
  step: 10,
  unit: '点',
};
