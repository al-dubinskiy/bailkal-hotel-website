import React from "react";
import { theme } from "../../../theme";
import { Box, Typography } from "@mui/material";
import PageTitleBannerBgImage from "../../../assets/images/page_title_banner_bg_image.png";

interface Props {}

export const PageTitleBanner = (props: Props) => {
  const {} = props;
  return (
    <Box
      sx={{
        flex: 1,
        borderRadius: "24px",
        backgroundColor: theme.palette.primary.lighter,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "24px 0",
        height: "345px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <img
        width={"100%"}
        height={"100%"}
        src={PageTitleBannerBgImage}
        style={{
          objectFit: "cover",
          position: "absolute",
          zIndex: 0,
          top: 0,
          left: 0,
        }}
      />
      <Typography variant={"h1"}>Бронирование номера</Typography>
    </Box>
  );
};
