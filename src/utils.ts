import {BadRequestException} from "@nestjs/common";

export const getDays = (startDate: Date, endDate: Date) => (Number(endDate.getTime()) - Number(startDate.getTime())) / (1000 * 3600 * 24);

export const validateDates = (startDate: Date, endDate: Date) => {
  const days = getDays(startDate, endDate);
  if (days < 1 || days > 30) {
    throw new BadRequestException('Booking allowed from 1 to 30 days');
  }
  if ([6,0].includes(startDate.getDay()) || [6,0].includes(endDate.getDay())) {
    throw new BadRequestException('Booking start/end dates doesn\'t allowed on weekend');
  }
};

export const getDaysOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

export const getPointOfMonth = (date: Date) => {
  const lastDay = getDaysOfMonth(date);
  date.setDate(lastDay);
  const lastDate = new Date(date);
  date.setDate(1);
  const firstDate = date;
  return [firstDate, lastDate];
}
