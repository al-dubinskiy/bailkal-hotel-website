import React from "react";
import {
  Button,
  Container,
  Link,
  Stack,
  Theme,
  Typography,
} from "@mui/material";
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import { PhoneIcon } from "../../assets/icons/PhoneIcon";
import { EmailIcon } from "../../assets/icons/EmailIcon";
import { EyeIcon } from "../../assets/icons/EyeIcon";
import { theme } from "../../theme";
import { SocialButtons } from "./SocialButtons";
import { CustomIconLabel } from "./shared/CustomIconLabel";
import { PageTitleBanner } from "./shared/PageTitleBanner";

interface Props {
  children: React.ReactNode;
  isShowPageTitleBanner?: boolean;
}

const BasePageLayout = (props: Props) => {
  const { children, isShowPageTitleBanner = false } = props;

  return (
    <Stack gap="24px">
      <Stack
        sx={{
          background: theme.palette.layoutBackground.light,
        }}
      >
        <Container
          sx={{
            padding: "5px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: { xs: "center", sm: "space-between" },
            flexDirection: "row",
            flexWrap: "wrap",
            rowGap: "10px",
            maxWidth: {
              xs: theme.breakpoints.values.xl,
              xxl: theme.breakpoints.values.xxl,
            },
          }}
        >
          <Stack
            flexDirection={"row"}
            sx={{
              columnGap: "24px",
              rowGap: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: { xs: "center", sm: "space-between" },
              flexDirection: "row",
              flexWrap: "wrap",
              flex: 0.9,
            }}
          >
            <CustomIconLabel
              icon={
                <PhoneIcon
                  htmlColor={theme.palette.primary.dark}
                  sx={{ fontSize: "16px" }}
                />
              }
              labelComponent={
                <Link href="tel:+73952250100" sx={{ fontSize: "14px" }}>
                  +7 3952 250-100 - отдел бронирования
                </Link>
              }
            />

            <CustomIconLabel
              icon={
                <EmailIcon
                  htmlColor={theme.palette.primary.dark}
                  sx={{ fontSize: "16px" }}
                />
              }
              labelComponent={
                <Link
                  href="mailto:reservation@eastland.ru"
                  sx={{ fontSize: "14px" }}
                >
                  reservation@eastland.ru
                </Link>
              }
            />

            <Button
              variant="text"
              startIcon={<EyeIcon sx={{ fontSize: "16px" }} />}
            >
              <Typography variant="someSmall">
                Версия для слабовидящих
              </Typography>
            </Button>
          </Stack>

          <SocialButtons iconSize="16px" />
        </Container>
      </Stack>

      <Container
        sx={{
          paddingLeft: "24px",
          paddingRight: "24px",
          maxWidth: {
            xs: theme.breakpoints.values.xl,
            xxl: theme.breakpoints.values.xxl,
          },
        }}
      >
        <Header></Header>
        {isShowPageTitleBanner ? <PageTitleBanner /> : null}
        {children}
        <Footer></Footer>
      </Container>
    </Stack>
  );
};

export default BasePageLayout;
