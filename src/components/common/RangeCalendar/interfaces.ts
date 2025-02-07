import { type Dispatch, type SetStateAction, type ReactNode } from "react";

export interface IPropsRangeCalendar {
  onDateRangeChange: Dispatch<
    SetStateAction<{
      fromDate: string | null;
      toDate: string | null;
    }>
  >;
  defaultStartDate?: Date | null;
  defaultEndDate?: Date | null;
  children?: ReactNode;
  isHideButton?: boolean;
  onChangeStart?: (date: Date | null) => void;
  onChangeTo?: (date: Date | null) => void;
}
