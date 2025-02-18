import { Card, CardDescription } from '@/components/ui/card';
import { Icons } from '@/constants/icons';

import { cn } from '@/lib/utils';
const TaskCard = () => {
  return (
    <Card
      className={cn(
        'w-[280px] h-[100px] flex rounded',
        'shadow-[0px_2px_3px_rgba(0,0,0,0.5)]',
        'rounded-sm ',
        // 'hover:bg-[rgba(255,255,255,0.8)]',
        'backdrop-blur-sm',
        'bg-[rgba(255,255,255,1)]',
        'p-2 pb-1'
      )}
    >
      <div className="flex-1 flex flex-col">
        <header>
          <h2
            className="relative inline-block font-semibold bg-no-repeat "
            style={{
              backgroundImage:
                'linear-gradient(to bottom, transparent 60%, #facc15 60%)',
            }}
          >
            プログラミング
          </h2>
        </header>
        <main className="flex flex-col flex-1">
          <CardDescription className="text-sm flex-1">
            Udemy講座：React入門
          </CardDescription>
          <section className="text-sm flex items-center space-x-4">
            <div>予定:120分</div>
            <div>実績:120分</div>
          </section>
        </main>
      </div>
      <footer className="flex flex-col items-center space-y-3">
        <div
          className={cn(
            ' shadow-[0px_2px_3px_rgba(0,0,0,0.5)]',
            'p-1 rounded-full hover:bg-slate-300 cursor-pointer'
          )}
        >
          <Icons.edit className="h-[18px] w-[18px] text-gray-600" />
        </div>
        <div
          className={cn(
            ' shadow-[0px_2px_3px_rgba(0,0,0,0.5)] text-gray-600',
            'p-1 rounded-full hover:bg-slate-300 cursor-pointer'
          )}
        >
          <Icons.trash className="h-[18px] w-[18px]" />
        </div>
      </footer>
    </Card>
  );
};

export default TaskCard;
