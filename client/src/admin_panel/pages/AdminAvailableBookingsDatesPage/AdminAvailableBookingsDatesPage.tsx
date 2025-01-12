import React, { useEffect, useMemo, useState } from "react";
import { AdminBasePageLayout } from "../components/AdminBasePageLayout/AdminBasePageLayout";
import { Box, Stack, Typography } from "@mui/material";
import {
  CustomSelect,
  SelectItemType,
} from "../../../pages/components/shared/FormElements/CustomSelect";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useGetApiData } from "../../../hooks/getApiData";
import { CustomCircleProgressIndicator } from "../../../pages/components/shared/CustomCircleProgressIndicator";
import moment, { Moment } from "moment";
import { CustomLabelAndDescription } from "../../../pages/components/shared/CustomLabelAndDescription";
import { CustomMultipleDatepicker } from "../../../pages/components/shared/CustomDatepickers/CustomMultipleDatepicker";
import { dateFormat } from "../../../constants";
import { theme } from "../../../theme";
import { CustomButton } from "../../../pages/components/shared/CustomButton";
import {
  ToogleButtonModeType,
  ToogleModeButton,
} from "../../../pages/components/shared/ToogleModeButton";
import { updateUnavailableBookingDate } from "../../../redux/slices/UnavailableBookingDates/httpRequests";
import {
  RewriteUnavailableBookingDate,
  UpdateUnavailableBookingDate,
} from "../../../redux/slices/UnavailableBookingDates/unavailableBookingDates";

interface Props {}

export const AdminAvailableBookingsDatesPage = (props: Props) => {
  const {} = props;
  const dispatch = useAppDispatch();
  const { isLoading: dataIsLoading } = useGetApiData();

  const { roomsCategories } = useAppSelector((state) => state.roomsCategories);
  const { unavailableBookingDates, updateUnavailableBookingDate } =
    useAppSelector((state) => state.unavailableBookingDates);

  const [roomCategoryId, setRoomCategoryId] = useState<string>("");
  const [selectedDatesMs, setSelectedDatesMs] = useState<number[]>([]);
  const [unavailableBookingDatesMs, setUnavailableBookingDatesMs] = useState<
    number[]
  >([]);
  const [сanBookingOnDates, setCanBookingOnDates] = useState<
    ToogleButtonModeType[]
  >([
    {
      id: "1",
      label: "Да",
      value: "yes",
      isSelected: false,
    },
    {
      id: "2",
      label: "Нет",
      value: "no",
      isSelected: false,
    },
  ]);

  const roomCategoriesList = useMemo((): SelectItemType[] => {
    if (roomsCategories) {
      return roomsCategories.map((item, index) => {
        return {
          id: index + 1,
          label: item.title,
          value: item._id,
        };
      });
    }
    return [];
  }, [roomsCategories]);

  useEffect(() => {
    if (roomCategoriesList.length) {
      setRoomCategoryId(roomCategoriesList[0].value);
    }
  }, [roomCategoriesList]);

  useEffect(() => {
    if (unavailableBookingDates && unavailableBookingDates.length) {
      setUnavailableBookingDatesMs(
        unavailableBookingDates.map((i) =>
          moment(i.date, dateFormat).toDate().getTime()
        )
      );
    }
  }, [unavailableBookingDates]);

  useEffect(() => {
    if (selectedDatesMs.length && unavailableBookingDatesMs.length) {
      const isCan = selectedDatesMs.find((i) =>
        unavailableBookingDatesMs.includes(i)
      )
        ? true
        : false;

      setCanBookingOnDates((prev) =>
        prev.map((i) => {
          if (i.value === "yes") {
            return {
              ...i,
              isSelected: isCan ? false : true,
            };
          } else {
            return {
              ...i,
              isSelected: isCan ? true : false,
            };
          }
        })
      );
    }
  }, [selectedDatesMs, unavailableBookingDatesMs]);

  const save = () => {
    dispatch(
      RewriteUnavailableBookingDate({
        unavailableBookingDates: unavailableBookingDatesMs.map((i) => ({
          date: moment(new Date(i)).format(dateFormat),
        })),
      })
    );
  };

  const prevUnavailableBookingDatesMs = useMemo(() => {
    if (unavailableBookingDates) {
      return unavailableBookingDates.map((i) =>
        moment(i.date, dateFormat).toDate().getTime()
      );
    }
    return [];
  }, [unavailableBookingDates]);

  const newUnavailableBookingDatesMs = useMemo(() => {
    return unavailableBookingDatesMs.filter(
      (i) => !prevUnavailableBookingDatesMs.includes(i)
    );
  }, [unavailableBookingDatesMs, prevUnavailableBookingDatesMs]);

  return (
    <AdminBasePageLayout
      children={
        dataIsLoading ? (
          <CustomCircleProgressIndicator />
        ) : (
          <Stack sx={{ alignItems: "stretch", gap: "24px" }}>
            <Stack sx={{ alignItems: "flex-start" }}>
              <CustomSelect
                id="roomCategoryId"
                name="roomCategoryId"
                inputLabel="Выберите категорию комнаты"
                data={roomCategoriesList}
                value={[roomCategoryId]}
                setValue={(val) =>
                  typeof val === "string" ? setRoomCategoryId(val) : null
                }
                labelPosition={"left"}
              />
            </Stack>

            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "flex-start",
                gap: "24px",
              }}
            >
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  gap: "15px",
                }}
              >
                <CustomMultipleDatepicker
                  selectedDatesMs={selectedDatesMs}
                  setSelectedDatesMs={setSelectedDatesMs}
                  unavailableBookingDatesMs={unavailableBookingDatesMs}
                />

                <CustomButton
                  label={"Очистить"}
                  onClick={() => setSelectedDatesMs([])}
                  containerVariant={"contained"}
                  containerBackgroundColor={"buttonLight"}
                  containerStyle={{
                    marginTop: "37px",
                    padding: "0 40px",
                  }}
                  withoutAnimation
                />
              </Stack>

              <Stack
                sx={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  marginLeft: "24px",
                  gap: "24px",
                  flex: 1,
                }}
              >
                <Stack
                  sx={{
                    alignItems: "stretch",
                    gap: "24px",
                    flex: 0.5,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      background: theme.palette.primary.lighter,
                      padding: "24px",
                      gap: "24px",
                      borderRadius: "16px",
                    }}
                  >
                    <Stack sx={{ gap: "15px", alignItems: "center" }}>
                      <Typography variant="label">Выбраные даты</Typography>
                      <Stack sx={{ gap: "5px" }}>
                        {selectedDatesMs.length ? (
                          selectedDatesMs.map((i) => (
                            <Typography
                              variant="label"
                              sx={{ fontWeight: 600 }}
                            >
                              {moment(i).format(dateFormat)}
                            </Typography>
                          ))
                        ) : (
                          <Typography variant="label" sx={{ fontWeight: 600 }}>
                            не выбрано
                          </Typography>
                        )}
                      </Stack>
                    </Stack>

                    {selectedDatesMs.length ? (
                      <ToogleModeButton
                        label="Возможно бронирование?"
                        modes={сanBookingOnDates}
                        setMode={(val) => {
                          const prevSelectedIdx = сanBookingOnDates.findIndex(
                            (i) => i.isSelected
                          );
                          const newSelectedIdx = val.findIndex(
                            (i: ToogleButtonModeType) => i.isSelected
                          );
                          if (newSelectedIdx !== prevSelectedIdx) {
                            const selectedValue =
                              сanBookingOnDates[newSelectedIdx].value;
                            if (selectedValue === "yes") {
                              setUnavailableBookingDatesMs((prev) =>
                                prev.filter((i) => !selectedDatesMs.includes(i))
                              );
                            } else {
                              setUnavailableBookingDatesMs((prev) => [
                                ...prev,
                                ...selectedDatesMs,
                              ]);
                            }
                            setSelectedDatesMs([]);
                          }
                          setCanBookingOnDates(val);
                        }}
                        isCanUnchecked={false}
                        contentStyles={{ flexDirection: "column" }}
                      />
                    ) : null}
                  </Box>

                  <CustomButton
                    label={"Сохранить"}
                    onClick={save}
                    containerVariant={"contained"}
                    containerBackgroundColor={"buttonDark"}
                    containerStyle={{
                      padding: "0 40px",
                    }}
                    withoutAnimation
                    loading={updateUnavailableBookingDate.isLoading}
                  />
                </Stack>

                {unavailableBookingDates ? (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      background: theme.palette.primary.lighter,
                      padding: "24px",
                      gap: "24px",
                      borderRadius: "16px",
                      flex: 0.5,
                    }}
                  >
                    <Stack sx={{ gap: "15px", alignItems: "center" }}>
                      <Typography variant="label">
                        Старые "недоступные" даты
                      </Typography>
                      <Stack sx={{ gap: "5px" }}>
                        {unavailableBookingDates.length ? (
                          unavailableBookingDates.map((i) => (
                            <Typography
                              variant="label"
                              sx={{ fontWeight: 600 }}
                            >
                              {moment(i.date).format(dateFormat)}
                            </Typography>
                          ))
                        ) : (
                          <Typography variant="label" sx={{ fontWeight: 600 }}>
                            не выбрано
                          </Typography>
                        )}
                      </Stack>
                    </Stack>

                    <Stack sx={{ gap: "15px", alignItems: "center" }}>
                      <Typography variant="label">
                        Новые "недоступные" даты
                      </Typography>
                      <Stack sx={{ gap: "5px" }}>
                        {newUnavailableBookingDatesMs.length ? (
                          newUnavailableBookingDatesMs.map((i) => (
                            <Typography
                              variant="label"
                              sx={{ fontWeight: 600 }}
                            >
                              {moment(new Date(i)).format(dateFormat)}
                            </Typography>
                          ))
                        ) : (
                          <Typography variant="label" sx={{ fontWeight: 600 }}>
                            не выбрано
                          </Typography>
                        )}
                      </Stack>
                    </Stack>
                  </Box>
                ) : null}
              </Stack>
            </Stack>
          </Stack>
        )
      }
      pageTitle="Статус доступности номеров на календарные дни"
    />
  );
};
