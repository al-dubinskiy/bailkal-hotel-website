import { TransferDirectionType, TransferStepType } from "./types";

export const stepsData: TransferStepType[] = [
  {
    id: 1,
    label: "Направление",
    value: "direction",
    isCurrent: true,
    isComplete: false,
  },
  {
    id: 2,
    label: "Транспорт",
    value: "transport",
    isCurrent: false,
    isComplete: false,
  },
  {
    id: 3,
    label: "Прибытие",
    value: "arrival",
    isCurrent: false,
    isComplete: false,
  },
];

export const transferDirectionData: TransferDirectionType[] = [
  {
    id: "1",
    label: "В отель",
    value: "to_hotel",
    variants: [
      {
        id: "1.1",
        label: 'Трансфер из Аэропорта в Отель "Байкал" с 06:00 до 22:00',
        value: "from_airport_in_hotel_variant_1",
        time_from: "06:00",
        time_to: "22:00",
        isSelected: false,
      },
      {
        id: "1.2",
        label: 'Трансфер из Аэропорта в Отель "Байкал" с 22:00 до 06:00',
        value: "from_airport_in_hotel_variant_2",
        time_from: "22:00",
        time_to: "06:00",
        isSelected: false,
      },
    ],
    isSelected: true,
  },
  {
    id: "2",
    label: "Из отеля",
    value: "from_hotel",
    variants: [
      {
        id: "1.1",
        label: 'Трансфер из Аэропорта из Отеля "Байкал" с 06:00 до 22:00',
        value: "to_airport_from_hotel_variant_1",
        time_from: "06:00",
        time_to: "22:00",
        isSelected: false,
      },
      {
        id: "1.2",
        label: 'Трансфер из Аэропорта из Отеля "Байкал" с 22:00 до 06:00',
        value: "to_airport_from_hotel_variant_2",
        time_from: "22:00",
        time_to: "06:00",
        isSelected: false,
      },
    ],
    isSelected: false,
  },
];
