
export const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-[#1DB779]'; // Nimbus success color
  if (score >= 60) return 'text-[#F9B944]'; // Nimbus warning color
  return 'text-[#E54D2E]'; // Nimbus danger color
};

export const getScoreBg = (score: number) => {
  if (score >= 80) return 'bg-[#1DB779]'; // Nimbus success color
  if (score >= 60) return 'bg-[#F9B944]'; // Nimbus warning color
  return 'bg-[#E54D2E]'; // Nimbus danger color
};
