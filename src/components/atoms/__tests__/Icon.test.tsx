import { render, screen } from '@testing-library/react';
import { Icon } from '../Icon';
import * as HeroIcons from '@heroicons/react/24/outline';

// HeroIconsのモック
jest.mock('@heroicons/react/24/outline', () => ({
  AcademicCapIcon: jest.fn((props) => <svg data-testid="academic-cap-icon" className={props.className} />),
  AdjustmentsHorizontalIcon: jest.fn((props) => <svg data-testid="adjustments-horizontal-icon" className={props.className} />),
}));

describe('Icon', () => {
  it('正常にレンダリングされる', () => {
    render(<Icon name="AcademicCapIcon" />);
    expect(screen.getByTestId('academic-cap-icon')).toBeInTheDocument();
  });

  it('存在しないアイコン名の場合にnullを返す', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    render(<Icon name="NonExistentIcon" />);
    expect(screen.queryByTestId('non-existent-icon')).not.toBeInTheDocument();
    expect(consoleWarnSpy).toHaveBeenCalledWith('Icon "NonExistentIcon" not found in Heroicons.');
    consoleWarnSpy.mockRestore();
  });

  it('デフォルトのサイズと色が適用される', () => {
    render(<Icon name="AcademicCapIcon" />);
    const iconElement = screen.getByTestId('academic-cap-icon');
    expect(iconElement).toHaveClass('h-5', 'w-5', 'text-black');
  });

  it('sizeプロパティが正しく適用される (sm)', () => {
    render(<Icon name="AcademicCapIcon" size="sm" />);
    const iconElement = screen.getByTestId('academic-cap-icon');
    expect(iconElement).toHaveClass('h-4', 'w-4');
  });

  it('sizeプロパティが正しく適用される (lg)', () => {
    render(<Icon name="AcademicCapIcon" size="lg" />);
    const iconElement = screen.getByTestId('academic-cap-icon');
    expect(iconElement).toHaveClass('h-6', 'w-6');
  });

  it('colorプロパティが正しく適用される (blue)', () => {
    render(<Icon name="AcademicCapIcon" color="blue" />);
    const iconElement = screen.getByTestId('academic-cap-icon');
    expect(iconElement).toHaveClass('text-blue-500');
  });

  it('classNameプロパティが正しく適用される', () => {
    render(<Icon name="AcademicCapIcon" className="custom-icon" />);
    const iconElement = screen.getByTestId('academic-cap-icon');
    expect(iconElement).toHaveClass('custom-icon');
  });
});
