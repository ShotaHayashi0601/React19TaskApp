import { Task } from '@/types';
import { FC, useEffect, useState } from 'react';
import { calculateTaskSummary } from '../../utils/taskSummary';
import { cn } from '@/lib/utils';
import ReactConfetti from 'react-confetti';
type SummaryDisplayProps = {
  optimisticTasks: Task[];
};
function isOver(actualTime: string, expectedTime: string): boolean {
  const actual = actualTime.split(':');
  const expected = expectedTime.split(':');
  const actualTotal = Number(actual[0]) * 60 + Number(actual[1]);
  const expectedTotal = Number(expected[0]) * 60 + Number(expected[1]);
  return actualTotal > expectedTotal;
}

const SummaryDisplay: FC<SummaryDisplayProps> = ({ optimisticTasks }) => {
  const summary = calculateTaskSummary(optimisticTasks);
  const [showConfetti, setShowConfetti] = useState(false);
  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (summary.progress >= 100) {
      setShowConfetti(true);
      timerId = setTimeout(() => {
        setShowConfetti(false);
      }, 60000);
    } else {
      setShowConfetti(false);
    }
    return () => clearTimeout(timerId);
  }, [summary.progress]);
  return (
    <>
      {showConfetti && (
        <ReactConfetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={500}
          recycle={false}
          //   colors={[
          //     '#00BCD4', // ターコイズブルー
          //     '#1E88E5', // ブライトブルー
          //     '#40E0D0', // ターコイズ
          //     '#4FC3F7', // ライトブルー
          //     '#B2EBF2', // パステルターコイズ
          //   ]}
          opacity={1}
          gravity={0.3}
          initialVelocityY={50}
          confettiSource={{
            x: 0,
            y: window.innerHeight,
            w: window.innerWidth,
            h: 0,
          }}
          tweenDuration={3000}
          //   onConfettiComplete={() => confettiComplete()}
        />
      )}
      <div className="flex items-center space-x-4">
        <div className="flex space-x-4 text-gray-800">
          <div>
            <div className="text-xs -mb-1">予定</div>
            <div>
              {summary.totalExpectedTime.split(':')[0]}
              <span className="text-xs">時間</span>
              {summary.totalExpectedTime.split(':')[1]}
              <span className="text-xs">分</span>
            </div>
          </div>
          <div
            className={cn({
              'text-red-500': isOver(
                summary.totalActualTime,
                summary.totalExpectedTime
              ), // 実績 > 予定 の場合は赤
              // それ以外は通常色
            })}
          >
            <div className="text-xs -mb-1">実績</div>
            <div>
              {summary.totalActualTime.split(':')[0]}
              <span className="text-xs">時間</span>
              {summary.totalActualTime.split(':')[1]}
              <span className="text-xs">分</span>
            </div>
          </div>
        </div>
        <div
          className={cn(
            summary.progress >= 100 ? 'text-green-500' : 'text-blue-700'
          )}
        >
          <div className="text-xs -mb-1">進捗</div>
          <div>
            {summary.progress}
            <span className="text-xs">%</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SummaryDisplay;
