import { Box, List, ListItemButton, Typography } from "@mui/material";
import React from "react";
import { theme } from "../../../../../theme";

interface Props {
  dates: any[];
}

export const DaysList = (props: Props) => {
  const { dates } = props;

  const DayItem = ({ date }: { date: any }) => {
    return (
      <ListItemButton
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          background: theme.palette.primary.light,
          borderRadius: "16px",
        }}
      >
        <Box
          sx={{
            height: "50%",
            background: theme.palette.primary.main,
            padding: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant={"label"} sx={{ fontWeight: "600" }}></Typography>
        </Box>
      </ListItemButton>
    );
  };

  return (
    <List
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: "16px",
        gap: "3px",
      }}
    >
      {dates.map((item, index) => {
        return <DayItem key={index} date={item} />;
      })}
    </List>
  );
};
