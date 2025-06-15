import type { Story } from '@ladle/react';
import { TextInput, TextInputProps } from '@/components/atoms/TextInput';

export const Default: Story<TextInputProps> = (args) => <TextInput {...args} />;
Default.args = {
  value: 'サンプルテキスト',
  onChange: (value) => console.log('TextInput changed:', value),
  placeholder: 'テキストを入力',
};

export const WithError: Story<TextInputProps> = (args) => <TextInput {...args} />;
WithError.args = {
  value: '',
  onChange: (value) => console.log('TextInput changed:', value),
  placeholder: 'テキストを入力',
  error: '必須項目です',
};

export const Disabled: Story<TextInputProps> = (args) => <TextInput {...args} />;
Disabled.args = {
  value: '無効なテキスト',
  onChange: (value) => console.log('TextInput changed:', value),
  placeholder: 'テキストを入力',
  disabled: true,
};

export const PasswordType: Story<TextInputProps> = (args) => <TextInput {...args} />;
PasswordType.args = {
  value: 'password123',
  onChange: (value) => console.log('TextInput changed:', value),
  placeholder: 'パスワード',
  type: 'password',
};
