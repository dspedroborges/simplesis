const today = new Date();
export const startOfTodayUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
export const endOfTodayUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999));
export const startOfMonth = new Date(today.getUTCFullYear(), today.getUTCMonth(), 1)
export const endOfMonth = new Date(today.getUTCFullYear(), today.getUTCMonth() + 1, 0, 23, 59, 59, 999)