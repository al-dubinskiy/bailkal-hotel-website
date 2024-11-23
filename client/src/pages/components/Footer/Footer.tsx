import React from "react";
import Grid from "@mui/material/Grid2";
import { Link, Stack, Typography } from "@mui/material";
import HotelLogo from "../../../assets/images/hotel_logo_ru.png";
import { SocialButtons } from "../SocialButtons";
import { CustomIconLabel } from "../shared/CustomIconLabel";
import { LocationIcon } from "../../../assets/icons/LocationIcon";
import { PhoneIcon } from "../../../assets/icons/PhoneIcon";
import { EmailIcon } from "../../../assets/icons/EmailIcon";
import { ContactUsForm } from "./components/ContactUsForm/ContactUsForm";

interface Props {}

export const Footer = (props: Props) => {
  const {} = props;

  return (
    <Grid container spacing={"24px"}>
      <Grid size={{ xs: 6, xl: 4 }} display={"flex"}>
        <Stack
          sx={{
            gap: "20px",
            alignItems: "flex-start",
            width: "80%",
            justifyContent: "flex-start",
          }}
        >
          <img
            height={"50px"}
            src={HotelLogo}
            style={{ objectFit: "contain" }}
          />
          <Typography variant="body">
            Добро пожаловать в отель Байкал!
            <br />
            Современные номера, красота Сибирской природы, вкусная авторская
            кухня – эти и другие возможности откроют для себя как бизнес
            путешественники, так и туристы.
          </Typography>

          <SocialButtons />
        </Stack>
      </Grid>
      <Grid size={{ xs: 6, xl: 4 }} display={"flex"} justifyContent={"center"}>
        <Stack gap="24px" width={"80%"}>
          <Stack gap="15px">
            <Typography variant="h4">Подпишись на нашу рассылку!</Typography>
            <Typography variant="body">
              Подпишись, чтобы получать от нас новости, интересные и выгодные
              предложения!
            </Typography>
          </Stack>

          <ContactUsForm />
        </Stack>
      </Grid>
      <Grid
        size={{ xs: 6, xl: 4 }}
        display={"flex"}
        justifyContent={"flex-end"}
      >
        <Stack gap="15px" width={"80%"}>
          <Typography variant="h4">Наши контакты</Typography>

          <CustomIconLabel
            icon={<LocationIcon sx={{ fontSize: "24px" }} />}
            label="Отель Байкал пос. Листвянка Академическая ул., 13"
          />

          <CustomIconLabel
            icon={<PhoneIcon sx={{ fontSize: "24px" }} />}
            labelComponent={
              <Typography variant="label" fontWeight={400}>
                <Link href="tel:+73952250100">+7 3952 250-100</Link> - отдел
                бронирования
                <br />
                <Link href="tel:+73952250111">+7 3952 250-111</Link> -
                бронирование для групп
                <br />
                <Link href="tel:+73952250100">+7 3952 250-100</Link>, доб. 2 -
                служба приема и размещения
                <br />
                <Link href="tel:+73952250888">+7 3952 250-888</Link> - ресторан
                <br />
                <Link href="tel:+79500650580">+7 (950) 065-05-80</Link> -
                руководитель отдела продаж
              </Typography>
            }
            sx={{ alignItems: "flex-start" }}
          />

          <CustomIconLabel
            icon={<EmailIcon sx={{ fontSize: "24px" }} />}
            labelComponent={
              <Typography variant="label" fontWeight={400}>
                <Link href="mailto:+79500650580">reservation@eastland.ru</Link>{" "}
                - отдел бронирования
                <br />
                <Link href="mailto:+79500650580">event1@eastland.ru</Link>,
                <br />
                <Link href="mailto:+79500650580">event2@eastland.ru</Link> -
                бронирование для групп
                <br />
                <Link href="mailto:+79500650580">commerce@eastland.ru</Link> -
                руководитель отдела продаж
              </Typography>
            }
            sx={{ alignItems: "flex-start" }}
          />
        </Stack>
      </Grid>
      <Grid size={{ xs: 6, md: 8 }}></Grid>
    </Grid>
  );
};
