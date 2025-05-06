import dayjs, { QUnitType, OpUnitType } from "dayjs";

export const TimeDifference = (
  fromDate: string,
  toDate: string,
  type: QUnitType | OpUnitType
) => {
  const startDate = dayjs(fromDate);

  return startDate.diff(dayjs(toDate), type);
};
