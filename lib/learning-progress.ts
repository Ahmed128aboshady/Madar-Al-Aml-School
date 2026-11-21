export type LearningIsland = "letters" | "numbers" | "english";
export const TOTALS = { letters: 28, numbers: 10, english: 26 };
export function validProgress(kind: LearningIsland, value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  const valid = new Set(
    Array.from({ length: TOTALS[kind] }, (_, i) =>
      kind === "english"
        ? "en-" + String.fromCharCode(65 + i)
        : (kind === "letters" ? "let-" : "num-") + (i + 1),
    ),
  );
  return [
    ...new Set(
      value.filter(
        (id): id is string => typeof id === "string" && valid.has(id),
      ),
    ),
  ];
}
export function readProgress(kind: LearningIsland): string[] {
  try {
    return validProgress(
      kind,
      JSON.parse(
        localStorage.getItem("madar_" + kind + "_completed_ids") || "[]",
      ),
    );
  } catch {
    return [];
  }
}
export function saveProgress(kind: LearningIsland, ids: string[]) {
  try {
    localStorage.setItem(
      "madar_" + kind + "_completed_ids",
      JSON.stringify(validProgress(kind, ids)),
    );
  } catch {
    /* Learning still works without storage. */
  }
}
