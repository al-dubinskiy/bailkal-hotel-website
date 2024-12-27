import React from "react";
import { AdminBasePageLayout } from "../components/AdminBasePageLayout/AdminBasePageLayout";

interface Props {}

export const AdminReceivedReviewsAndOverallRatingPage = (props: Props) => {
  const {} = props;
  return (
    <AdminBasePageLayout children={<div></div>} pageTitle="Общий рейтинг" />
  );
};
