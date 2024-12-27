import React from "react";
import { AdminBasePageLayout } from "../components/AdminBasePageLayout/AdminBasePageLayout";

interface Props {}

export const AdminNewsLetterByEmailPage = (props: Props) => {
  const {} = props;
  return (
    <AdminBasePageLayout
      children={<div></div>}
      pageTitle="Совершить рассылку на электронную почту подписчиков"
    />
  );
};
