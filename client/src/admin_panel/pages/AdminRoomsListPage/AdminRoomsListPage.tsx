import React from "react";
import { AdminBasePageLayout } from "../components/AdminBasePageLayout/AdminBasePageLayout";

interface Props {}

export const AdminRoomsListPage = (props: Props) => {
  const {} = props;
  return (
    <AdminBasePageLayout children={<div></div>} pageTitle="Типы номеров" />
  );
};
