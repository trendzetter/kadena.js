import { Text } from '@kadena/kode-ui';
import { tokenBadgeWrapperClass } from './style.css';

interface BadgeProps {
  label: string;
}

export const Badge: React.FC<BadgeProps> = ({ label }) => {
  return (
    <div className={tokenBadgeWrapperClass}>
      <Text size="smallest" bold>
        {label}
      </Text>
    </div>
  );
};
