import { taskStatus } from "@/constants";
import { TaskStatus } from "@/types";

//ステータス完了時に、実績時間の入力がない場合は、予定時間を実績時間にする
export const getPresetActualTime = (
  status: TaskStatus,
  actualTime: number | undefined,
  expectedTime: number
) => {
  if (status === taskStatus.COMPLETED) {
    if (!actualTime) {
      return expectedTime;
    }
  }
  return actualTime;
};
