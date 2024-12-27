import { Stack, Typography } from "@mui/material";
import React from "react";
import { SideBar } from "./components/SideBar";

interface Props {
  children: React.ReactNode;
  pageTitle: string;
}

export const AdminBasePageLayout = (props: Props) => {
  const { children, pageTitle } = props;
  return (
    <Stack sx={{ flexDirection: "row", alignItems: "flex-start", gap: "24px" }}>
      <SideBar />

      <Stack
        sx={{
          flex: 1,
          alignItems: "stretch",
          padding: "24px",
          paddingLeft: "0",
          gap: "24px",
        }}
      >
        <Typography variant="h4" sx={{ textTransform: "none" }}>
          {pageTitle}
        </Typography>
        {children}
      </Stack>
    </Stack>
  );
};
