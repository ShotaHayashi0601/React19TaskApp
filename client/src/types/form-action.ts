export const formActions = {
  ADD: 'add',
  UPDATE: 'update',
} as const;
export type FormAction = (typeof formActions)[keyof typeof formActions];
