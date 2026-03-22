import xpCurve from '~~/server/data/rules/xp-curve.json';
import type { XPCurve } from '~~/server/models/rules/xp-curve';

export const useXPCurve = () => {
  const curve = xpCurve as XPCurve;
  const maxLevel = curve.toSorted((a, b) => b.to_level - a.to_level)[0]?.to_level ?? 0;

  const getXPForLevel = (toLevel: number): number | undefined => {
    const entry = curve.find((entry) => entry.to_level === toLevel);
    return entry?.required_xp;
  };

  return {
    getXPForLevel,
    getAllLevels: () => curve,
    getMaxLevel: () => maxLevel,
  };
};
