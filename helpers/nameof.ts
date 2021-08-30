export const nameofFactory = <T>() => (name: Extract<keyof T, string>): string => name;
