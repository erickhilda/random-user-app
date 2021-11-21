import { formatDate } from "./date.util";

export function serializeData(data: any) {
  return data.map((user: any) => {
    return {
      ...user,
      key: user.email,
      name: `${user.name.first} ${user.name.last}`,
      email: user.email,
      registered: formatDate(user.registered.date),
    };
  });
}
