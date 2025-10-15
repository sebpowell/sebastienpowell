'use client';

import { AnimatedDashedBorder } from '@/components/elements/Animations/DashedBorder';
import { useState } from 'react';

export function InteractiveCounter() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-full rounded-lg border bg-yellow-200 p-4">
      <AnimatedDashedBorder>
        <div className="p-3 text-center">Upload files</div>
      </AnimatedDashedBorder>
    </div>
  );
}
