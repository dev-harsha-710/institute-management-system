export function camelToSnake(camelCaseString: string): string {
  return camelCaseString.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
}

export const convertKeysToSnakeCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((item) => convertKeysToSnakeCase(item));
  } else if (obj !== null && obj.constructor === Object) {
    const newObj: any = {};
    Object.keys(obj).forEach((key) => {
      const newKey = camelToSnake(key);
      newObj[newKey] = convertKeysToSnakeCase(obj[key]);
    });
    return newObj;
  }
  return obj;
};
