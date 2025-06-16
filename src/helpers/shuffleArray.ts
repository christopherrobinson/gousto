export const shuffleArray = <T>(arr: T[]): T[] => {
  // Create a copy to avoid mutating the original array
  const shuffled = [...arr];
  
  // Fisher-Yates shuffle algorithm - O(n) time complexity
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
};
