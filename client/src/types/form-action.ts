export const formActions = {
  ADD: 'add',
  UPDATE: 'update',
  DELETE: 'delete',
} as const;
export type FormAction = (typeof formActions)[keyof typeof formActions];
