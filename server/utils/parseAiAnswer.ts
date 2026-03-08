export interface ParsedAiAnswer {
  correctness: 'Correct' | 'Partly correct' | 'Incorrect';
  correctnessPercentage: number;
  explanation: string;
}

export function parseAiAnswer(rawAnswer: string): ParsedAiAnswer {
  const lines = rawAnswer
    .trim()
    .split('\n')
    .map((line) => line.trim());

  if (lines.length < 2) {
    throw new Error('Invalid AI answer format: Expected at least 2 lines.');
  }

  const correctness = lines[0] as 'Correct' | 'Partly correct' | 'Incorrect';
  const correctnessPercentage = parseInt(lines[1]!, 10);
  const explanation = lines.slice(3).join('\n').trim();

  return {
    correctness,
    correctnessPercentage,
    explanation,
  };
}
