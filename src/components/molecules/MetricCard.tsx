import React from 'react';
import { Card } from '@/components/atoms/Card';
import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/atoms/Icon';

export type MetricCardProps = {
  title: string;
  value: number;
  unit: string;
  change?: number; // 変化率 (例: 0.05 for +5%)
  trend?: 'up' | 'down' | 'neutral'; // 傾向 (up, down, neutral)
};

/**
 * 指標表示カードコンポーネント
 * 主要な数値を視覚的に表示します。
 * @param props - MetricCardProps
 * @returns JSX.Element
 */
export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  change,
  trend,
}) => {
  const displayValue = value.toLocaleString();
  const displayChange = change !== undefined ? `${(change * 100).toFixed(1)}%` : '';

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <Icon name="ArrowUpIcon" size="sm" color="green" />;
      case 'down':
        return <Icon name="ArrowDownIcon" size="sm" color="red" />;
      case 'neutral':
        return <Icon name="MinusIcon" size="sm" color="gray" />;
      default:
        return null;
    }
  };

  return (
    <Card className="metric-card">
      <Text size="sm" color="blue" weight="medium" className="metric-label">
        {title}
      </Text>
      <div className="flex items-baseline justify-between mt-1">
        <Text size="xl" weight="bold" className="metric-value">
          {displayValue}
          <span className="text-base font-normal ml-1">{unit}</span>
        </Text>
        {change !== undefined && (
          <div className="flex items-center ml-2">
            {getTrendIcon()}
            <Text size="sm" className={`ml-1 ${change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-600'}`}>
              {displayChange}
            </Text>
          </div>
        )}
      </div>
    </Card>
  );
};
