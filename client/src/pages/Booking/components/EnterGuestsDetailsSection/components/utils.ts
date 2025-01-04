import moment, { Moment } from "moment";
import { times } from "./constants";
import { dateTimeFormat } from "../../../../../constants";

// Получить ранее установленное "время заезда"
export const getPrevArrivalTime = ({
  arrival_datetime,
}: {
  arrival_datetime: string;
}) => {
  const a = moment(arrival_datetime, dateTimeFormat).format("HH:mm");
  return times.find((i) => i.value === a)?.value || times[0].value;
};

// Получить ранее установленное "время выезда"
export const getPrevDepartureTime = ({
  departure_datetime,
}: {
  departure_datetime: string;
}) => {
  const a = moment(departure_datetime, dateTimeFormat).format("HH:mm");
  return times.find((i) => i.value === a)?.value || times[8].value;
};
