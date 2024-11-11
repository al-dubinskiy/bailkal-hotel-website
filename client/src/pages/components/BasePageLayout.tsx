import React from "react";
import { Button, Container, Stack, Theme, Typography } from "@mui/material";
import { Header } from "./Header/Header";
import { Footer } from "./Footer";
import { PhoneIcon } from "../../assets/icons/PhoneIcon";
import { EmailIcon } from "../../assets/icons/EmailIcon";
import { EyeIcon } from "../../assets/icons/EyeIcon";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { theme } from "../../theme";

interface Props {
  children: React.ReactNode;
}

const BasePageLayout = (props: Props) => {
  const { children } = props;

  return (
    <Stack gap="24px">
      <Stack
        sx={{
          background: theme.palette.primary.lighter,
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            padding: "5px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            flexWrap: "wrap",
            rowGap: "10px",
          }}
        >
          <Stack
            flexDirection={"row"}
            sx={{
              columnGap: "24px",
              rowGap: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              flexWrap: "wrap",
              flex: 0.9,
            }}
          >
            <Button
              variant="text"
              startIcon={<PhoneIcon />}
              sx={{ fontSize: "20px" }}
            >
              <Typography variant="someSmall">
                +7 3952 250-100 - отдел бронирования
              </Typography>
            </Button>

            <Button variant="text" startIcon={<EmailIcon />}>
              <Typography variant="someSmall">
                reservation@eastland.ru
              </Typography>
            </Button>

            <Button variant="text" startIcon={<EyeIcon />}>
              <Typography variant="someSmall">
                Версия для слабовидящих
              </Typography>
            </Button>
          </Stack>

          <Stack flexDirection={"row"} gap="24px">
            <Button>
              <FacebookIcon
                htmlColor={theme.palette.primary.dark}
                sx={{ fontSize: "20px" }}
              />
            </Button>

            <Button>
              <InstagramIcon
                htmlColor={theme.palette.primary.dark}
                sx={{ fontSize: "20px" }}
              />
            </Button>

            <Button>
              <TwitterIcon
                htmlColor={theme.palette.primary.dark}
                sx={{ fontSize: "20px" }}
              />
            </Button>

            <Button>
              <LinkedInIcon
                htmlColor={theme.palette.primary.dark}
                sx={{ fontSize: "20px" }}
              />
            </Button>

            <Button>
              <YouTubeIcon
                htmlColor={theme.palette.primary.dark}
                sx={{ fontSize: "20px" }}
              />
            </Button>
          </Stack>
        </Container>
      </Stack>

      <Container
        maxWidth="xl"
        sx={{
          paddingLeft: "24px",
          paddingRight: "24px",
        }}
      >
        <Header></Header>
        {children}
        <Footer></Footer>
      </Container>
    </Stack>
  );
};

export default BasePageLayout;
