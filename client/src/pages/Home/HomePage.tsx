import React from "react";
import { useAppDispatch } from "../../redux/store";
import BasePageLayout from "../components/BasePageLayout";
import { Header } from "../components/Header";

export const HomePage = () => {
  const dispatch = useAppDispatch();

  return (
    <BasePageLayout>
      <div>Home Page</div>
    </BasePageLayout>
  );
};
