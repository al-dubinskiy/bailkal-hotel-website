import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Button, Stack } from "@mui/material";
import { theme } from "../../theme";

interface Props {
  iconSize?: string;
}

export const SocialButtons = (props: Props) => {
  const { iconSize } = props;

  return (
    <Stack flexDirection={"row"} gap="24px">
      <Button href="https:/facebook.com" target="_blank">
        <FacebookIcon
          htmlColor={theme.palette.primary.dark}
          sx={{ fontSize: iconSize ? iconSize : "24px" }}
        />
      </Button>

      <Button href="https:/instagram.com" target="_blank">
        <InstagramIcon
          htmlColor={theme.palette.primary.dark}
          sx={{ fontSize: iconSize ? iconSize : "24px" }}
        />
      </Button>

      <Button href="https:/twitter.com" target="_blank">
        <TwitterIcon
          htmlColor={theme.palette.primary.dark}
          sx={{ fontSize: iconSize ? iconSize : "24px" }}
        />
      </Button>

      <Button href="https:/linked-in.com" target="_blank">
        <LinkedInIcon
          htmlColor={theme.palette.primary.dark}
          sx={{ fontSize: iconSize ? iconSize : "24px" }}
        />
      </Button>

      <Button href="https:/youtube.com" target="_blank">
        <YouTubeIcon
          htmlColor={theme.palette.primary.dark}
          sx={{ fontSize: iconSize ? iconSize : "24px" }}
        />
      </Button>
    </Stack>
  );
};
