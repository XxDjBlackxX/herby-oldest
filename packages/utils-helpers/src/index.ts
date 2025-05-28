export * from "./user";
export * from "./string";

export const setLimitItems = ({
  before,
  after,
  i,
}: {
  before: number | string | any;
  after: number | string | any;
  i: Array<any>;
}) => {
  const correctedBefore =
    typeof before == "number" ? before : Math.max(parseInt(before, 10) || 0, 0);
  const correctedAfter =
    typeof after == "number" ? after : Math.max(parseInt(after, 10) || 0, 0);

  const start = Math.max(correctedAfter, 0);
  const end =
    correctedBefore > 0 ? Math.min(correctedBefore, i.length) : i.length;

  return i.slice(start, end);
};

export function flattenObject(
  obj: any,
  parent: string = "",
  result: any = {},
): any {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const propName = parent ? `${parent}.${key}` : key;

      if (typeof obj[key] === "object" && obj[key] !== null) {
        flattenObject(obj[key], propName, result);
      } else {
        result[propName] = obj[key];
      }
    }
  }
  return result;
}

export const prepareStateUpdates = (params: Record<string, unknown>) => {
  return Object.entries(params).reduce(
    (obj, [key, value]) => {
      obj[key] = value;
      return obj;
    },
    {} as Record<string, unknown>,
  );
};
