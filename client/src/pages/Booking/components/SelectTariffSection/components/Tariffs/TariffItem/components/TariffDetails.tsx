import { Stack, Typography } from "@mui/material";
import React from "react";

interface Props {
  included_services?: string[];
  payment_and_cancellation_terms?: string[];
  note?: string;
}

export const TariffDetails = (props: Props) => {
  const { included_services, payment_and_cancellation_terms, note } = props;

  return (
    <Stack
      sx={{
        borderRadius: "16px",
        padding: "24px",
        width: "100%",
        background: "#fff",
        marginBottom: "24px",
      }}
    >
      {included_services ? (
        <>
          <Typography
            variant="label"
            sx={{
              fontWeight: 600,
              paddingBottom: "5px",
            }}
          >
            В стоимость проживания включен:
          </Typography>

          <Stack sx={{ marginBottom: "24px" }}>
            {included_services.map((item, index) => {
              return (
                <Typography key={index} variant="body">
                  - {item}
                </Typography>
              );
            })}
          </Stack>
        </>
      ) : null}

      {payment_and_cancellation_terms ? (
        <>
          <Typography
            variant="label"
            sx={{
              fontWeight: 600,
              paddingBottom: "5px",
            }}
          >
            Условия оплаты и аннуляции:
          </Typography>

          <Stack sx={{ marginBottom: "24px" }}>
            {payment_and_cancellation_terms.map((item, index) => {
              return (
                <Typography key={index} variant="body">
                  - {item}
                </Typography>
              );
            })}
          </Stack>
        </>
      ) : null}

      <Typography variant="label" sx={{ fontWeight: 600 }}>
        {note}
      </Typography>
    </Stack>
  );
};
