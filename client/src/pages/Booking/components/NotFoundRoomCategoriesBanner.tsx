import React from "react";
import { useAppSelector } from "../../../hooks/redux";
import { Box, Link, Stack, Typography } from "@mui/material";
import { theme } from "../../../theme";
import { ErrorOutlined } from "@mui/icons-material";
import { CustomIconLabel } from "../../components/shared/CustomIconLabel";
import { PhoneIcon } from "../../../assets/icons/PhoneIcon";
import { EmailIcon } from "../../../assets/icons/EmailIcon";

interface Props {}

export const NotFoundRoomCategoriesBanner = () => {
  const { filterParams } = useAppSelector((state) => state.bookings);

  const { arrival_datetime, departure_datetime } = filterParams;

  return (
    <Box
      sx={{
        padding: "24px",
        borderRadius: "16px",
        background: theme.palette.secondary.lighter,
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        gap: "15px",
        margin: "24px 0",
      }}
    >
      <Stack sx={{ flexDirection: "row", gap: "24px", alignItems: "center" }}>
        <ErrorOutlined
          htmlColor={theme.palette.secondary.dark}
          sx={{ fontSize: "40px" }}
        />
        <Typography
          variant="h7"
          sx={{ color: theme.palette.secondary.dark, fontWeight: "600" }}
        >
          {`На ${arrival_datetime.format(
            "DD MMMM"
          )} - ${departure_datetime.format(
            "DD MMMM, YYYY"
          )} нет доступных номеров`}
        </Typography>
      </Stack>

      <Typography variant="label">
        Выберите другие даты или свяжитесь с отделом бронирования.
      </Typography>
      <Stack sx={{ flexDirection: "row", gap: "24px", alignItems: "center" }}>
        <CustomIconLabel
          icon={
            <PhoneIcon
              htmlColor={theme.palette.secondary.dark}
              sx={{ fontSize: "24px" }}
            />
          }
          labelComponent={
            <Link
              href="tel:+73952250100"
              sx={{ fontSize: "16px", fontWeight: 500 }}
            >
              +7 3952 250-100
            </Link>
          }
        />

        <CustomIconLabel
          icon={
            <EmailIcon
              htmlColor={theme.palette.secondary.dark}
              sx={{ fontSize: "24px" }}
            />
          }
          labelComponent={
            <Link
              href="mailto:reservation@eastland.ru"
              sx={{ fontSize: "16px", fontWeight: 500 }}
            >
              reservation@eastland.ru
            </Link>
          }
        />
      </Stack>
    </Box>
  );
};
