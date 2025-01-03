import { Stack } from "@mui/material";
import React, { useState } from "react";
import { CustomRangeDatepicker } from "../../components/shared/RangeDatepicker/CustomRangeDatepicker";
import { SelectGuestsDropdown } from "./FiltersBar/SelectGuestsDropdown";
import { CustomSelect } from "../../components/shared/FormElements/CustomSelect";
import { theme } from "../../../theme";
import { countries } from "./EnterGuestsDetailsSection/components/constants";

type LocaleType = {
  id: string;
  label: string;
  value: string;
};

const locales: LocaleType[] = [
  {
    id: "1",
    label: "Ru",
    value: "ru",
  },
  {
    id: "2",
    label: "En",
    value: "en",
  },
];

interface Props {}

export const FiltersBar = (props: Props) => {
  const [curLocale, setCurLocale] = useState<LocaleType>(locales[0]);
  const [promoCode, setPromoCode] = useState<string | null>(null);

  return (
    <Stack
      sx={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.palette.primary.lighter,
        borderRadius: "20px",
        padding: "24px",
        minHeight: "150px",
        gap: "24px",
        flexWrap: "wrap",
      }}
    >
      <CustomRangeDatepicker />

      <SelectGuestsDropdown />

      <CustomSelect
        inputLabel="Язык"
        data={locales}
        value={[curLocale.value]}
        setValue={(val) =>
          typeof val === "string"
            ? setCurLocale(locales.find((i) => i.value === val) || locales[0])
            : null
        }
      />
    </Stack>
  );
};
