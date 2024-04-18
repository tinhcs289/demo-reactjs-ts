import newGuid from "@/helpers/stringHelpers/newGuid";
import type { Coordinate, DocSize, Signature } from "./_types";
export const DEFAULT_COORDINATE:Coordinate= { x: 0, y: 0 };
export const NO_DOC_SIZE: DocSize = { width: 0, height: 0, fullHeight: 0 };
export const SIGNATURE: Signature = {
  _id: newGuid(),
  positionOnTheScreen: DEFAULT_COORDINATE,
  positionRelativeToTheParent: DEFAULT_COORDINATE,
  ratioRelativeToTheParent: DEFAULT_COORDINATE,
  width: { inPx: 0, inPercent: 0 },
  inPage: 1,
};