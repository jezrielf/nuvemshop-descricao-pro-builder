
import { useState } from 'react';

export const useDescriptionCount = (userId: string | undefined) => {
  const [descriptionCount, setDescriptionCount] = useState(() => {
    if (userId) {
      const storedCount = localStorage.getItem(`descriptionCount_${userId}`);
      return storedCount ? parseInt(storedCount, 10) : 0;
    }
    const anonymousCount = localStorage.getItem('descriptionCount_anonymous');
    return anonymousCount ? parseInt(anonymousCount, 10) : 0;
  });

  const incrementDescriptionCount = () => {
    const newCount = descriptionCount + 1;
    setDescriptionCount(newCount);
    if (userId) {
      localStorage.setItem(`descriptionCount_${userId}`, newCount.toString());
    } else {
      localStorage.setItem('descriptionCount_anonymous', newCount.toString());
    }
  };

  return {
    descriptionCount,
    setDescriptionCount,
    incrementDescriptionCount
  };
};
