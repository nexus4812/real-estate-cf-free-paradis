import type { Story } from '@ladle/react';
import { Label, LabelProps } from '@/components/atoms/Label';

export const Default: Story<LabelProps> = (args) => <Label {...args} />;
Default.args = {
  children: 'デフォルトラベル',
  htmlFor: 'default-input',
};

export const Required: Story<LabelProps> = (args) => <Label {...args} />;
Required.args = {
  children: '必須ラベル',
  htmlFor: 'required-input',
  required: true,
};

export const WithInput: Story<LabelProps> = (args) => (
  <div>
    <Label {...args} />
    <input id="input-for-label" type="text" className="input-field" />
  </div>
);
WithInput.args = {
  children: '入力フィールドのラベル',
  htmlFor: 'input-for-label',
};
