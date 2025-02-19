export const formActions = {
  ADD: 'ADD',
  EDIT: 'EDIT',
  DELETE: 'DELETE',
} as const;
export type FormAction = (typeof formActions)[keyof typeof formActions];
