export function toAiJudgmentFormat(task: string, solution: string): string {
  return `============= Task =============\n${task}\n============= Answer =============\n${solution}`;
}
