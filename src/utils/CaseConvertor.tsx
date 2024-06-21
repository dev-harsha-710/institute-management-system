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
export const convertDateToISO = (dateInput: Date | null): string => {
  let dateStr = String(dateInput);
  const date = new Date(dateStr);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
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
