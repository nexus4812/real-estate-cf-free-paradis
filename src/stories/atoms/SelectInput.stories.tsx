import type { Story } from '@ladle/react';
import { SelectInput, SelectInputProps } from '@/components/atoms/SelectInput';

const options = [
  { value: 'option1', label: 'オプション1' },
  { value: 'option2', label: 'オプション2' },
  { value: 'option3', label: 'オプション3' },
];

export const Default: Story<SelectInputProps> = (args) => <SelectInput {...args} />;
Default.args = {
  value: 'option1',
  onChange: (value) => console.log('SelectInput changed:', value),
  options: options,
  placeholder: '選択してください',
};

export const WithError: Story<SelectInputProps> = (args) => <SelectInput {...args} />;
WithError.args = {
  value: '',
  onChange: (value) => console.log('SelectInput changed:', value),
  options: options,
  placeholder: '選択してください',
  error: '選択は必須です',
};

export const Disabled: Story<SelectInputProps> = (args) => <SelectInput {...args} />;
Disabled.args = {
  value: 'option2',
  onChange: (value) => console.log('SelectInput changed:', value),
  options: options,
  placeholder: '選択してください',
  disabled: true,
};

export const NoPlaceholder: Story<SelectInputProps> = (args) => <SelectInput {...args} />;
NoPlaceholder.args = {
  value: 'option1',
  onChange: (value) => console.log('SelectInput changed:', value),
  options: options,
};
