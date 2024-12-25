import React from "react";
import { AdminBasePageLayout } from "../../components/AdminBasePageLayout/AdminBasePageLayout";

interface Props {}

export const AdminEmailSubscribersPage = (props: Props) => {
  const {} = props;
  return (
    <AdminBasePageLayout
      children={<div></div>}
      pageTitle="Список подписчиков"
    />
  );
};
