import { format, parseISO } from "date-fns";

export function camelToSnake(camelCaseString: string): string {
  return camelCaseString.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
}

export const convertDateToddMMyyyy = (date: string): string => {
  if (!date) return "";
  const dateParts = date.split("-");
  const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;

  return formattedDate;
};
export const convertDateToISO = (date: string): string => {
  const [day, month, year] = date.split("-");
  return `${year}-${month}-${day}`;
};

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
