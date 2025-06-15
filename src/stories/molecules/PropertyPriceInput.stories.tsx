import type { Story } from '@ladle/react';
import { PropertyPriceInput, PropertyPriceInputProps } from '@/components/molecules/PropertyPriceInput';

export const Default: Story<PropertyPriceInputProps> = (args) => (
  <PropertyPriceInput {...args} />
);
Default.args = {
  value: 30000000, // 3000万円
  onChange: (value) => console.log('価格変更:', value),
};

export const WithError: Story<PropertyPriceInputProps> = (args) => (
  <PropertyPriceInput {...args} />
);
WithError.args = {
  value: 0,
  onChange: (value) => console.log('価格変更:', value),
  error: '物件価格は必須です',
};
