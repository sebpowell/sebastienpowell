
import { Box } from '@/components/elements/Box';
import { Icon } from '@/components/elements/Icon';
import { useEffect, useState } from 'react';
import { useCopyToClipboard, useTimeoutFn } from 'react-use';

type CopyToClipboardProps = {
  content?: string;
  textContentRef?: React.RefObject<HTMLElement | null>;
};

const CopyToClipboard = (props: CopyToClipboardProps) => {
  const { content, textContentRef } = props;

  const [state, copyToClipboard] = useCopyToClipboard();

  const [showTick, setShowTick] = useState(false);

  const [, , resetTimeout] = useTimeoutFn(() => setShowTick(false), 1000);

  useEffect(() => {
    if (state.value) {
      setShowTick(true);
    }
  }, [state]);

  const handleClick = () => {
    if (content) {
      copyToClipboard(content);
    } else {
      copyToClipboard(textContentRef?.current?.textContent || '');
    }

    resetTimeout();
  };

  return (
    <Box as="button" onClick={handleClick} className="w-4">
      <Icon icon={showTick ? 'Check' : 'Copy'} />
    </Box>
  );
};

export { CopyToClipboard };
