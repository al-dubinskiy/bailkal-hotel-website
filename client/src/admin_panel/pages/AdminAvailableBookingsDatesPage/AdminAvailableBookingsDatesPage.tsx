import React from "react";
import { AdminBasePageLayout } from "../components/AdminBasePageLayout/AdminBasePageLayout";

interface Props {}

export const AdminAvailableBookingsDatesPage = (props: Props) => {
  const {} = props;
  return (
    <AdminBasePageLayout
      children={<div></div>}
      pageTitle="Статус доступности номеров на календарные дни"
    />
  );
};
