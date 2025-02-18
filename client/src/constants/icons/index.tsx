/* eslint-disable @typescript-eslint/no-explicit-any */

import { CalendarIcon, Minus, Pencil, Plus, Trash } from 'lucide-react';

export const Icons = {
  plus: (props: any) => <Plus {...props} />,
  minus: (props: any) => <Minus {...props} />,
  trash: (props: any) => <Trash {...props} />,
  edit: (props: any) => <Pencil {...props} />,
  calendar: (props: any) => <CalendarIcon {...props} />,
};
