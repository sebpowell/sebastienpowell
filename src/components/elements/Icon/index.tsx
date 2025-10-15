import { Check, Copy, LucideProps } from 'lucide-react';
import { createElement } from 'react';

const IconComponents = {
  Check,
  Copy,
};

type IconNames = keyof typeof IconComponents;

type IconProps = LucideProps & {
  size?: number;
  icon: IconNames;
};

const Icon = (props: IconProps) => {
  const { size, icon, ...rest } = props;

  const iconComponent = IconComponents[icon];

  if (!iconComponent) {
    console.warn('Icon does not exist', icon);
    return;
  }

  return createElement(iconComponent, { size, ...rest });
};

export { Icon, type IconProps, type IconNames };
