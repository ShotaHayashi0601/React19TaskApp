/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  CalendarIcon,
  Minus,
  Pencil,
  Plus,
  Trash,
  Check,
  CircleAlert,
} from 'lucide-react';
export const Icons = {
  plus: (props: any) => <Plus {...props} />,
  minus: (props: any) => <Minus {...props} />,
  trash: (props: any) => <Trash {...props} />,
  edit: (props: any) => <Pencil {...props} />,
  calendar: (props: any) => <CalendarIcon {...props} />,
  check: (props: any) => <Check {...props} />,
  alert: (props: any) => <CircleAlert {...props} />,
};
