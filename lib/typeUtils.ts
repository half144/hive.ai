const typ = {
  string: "string",
  number: "number",
  array: "array",
  boolean: "boolean",
  function: "function",
  undefined: "undefined",
  symbol: "symbol",
  bigint: "bigint",
  date: "date",
  error: "error",
  options: (options: string[]) => options.join(" | ")
};

function getParams(obj: any): string {
  function getType(value: any): string {
    if (Array.isArray(value)) {
      const arrayType = getType(value[0]);
      return `${arrayType}[]`;
    } else if (typeof value === "object" && value !== null) {
      const nestedProps = Object.entries(value)
        .map(([key, val]) => `"${key}": ${getType(val)}`)
        .join(", ");
      return `{ ${nestedProps} }`;
    } else {
      return typeof value;
    }
  }
  const typeRepresentation = Object.entries(obj)
    .map(([key, value]) => `"${key}": ${getType(value)}`)
    .join(", ");

  return `{ ${typeRepresentation} }`;
}

export { typ, getParams };
