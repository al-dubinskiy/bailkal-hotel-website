import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  ClickAwayListener,
  Fade,
  Paper,
  Popper,
  Stack,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { theme } from "../../../../theme";
import { useButtonDropdownCardStyles } from "../../../components/shared/styles";
import { CustomCounterButton } from "../../../components/shared/CustomCounterButton";
import { CustomButton } from "../../../components/shared/CustomButton";
import { isEqual } from "lodash";
import { CustomSelect } from "../../../components/shared/FormElements/CustomSelect";
import { useAppSelector } from "../../../../hooks/redux";

type RoomQuestsCountType = {
  adults: number;
  children: number;
};

type Rooms = RoomQuestsCountType[];

interface Props {
  roomsQuestsCount: Rooms;
  setRoomsQuestsCount: (val: Rooms) => void;
}

export const SelectQuestsDropdown = (props: Props) => {
  const { roomsQuestsCount, setRoomsQuestsCount } = props;
  const { roomQuestsMax } = useAppSelector((state) => state.bookings);

  const [roomsQuestsCountLocal, setRoomsQuestsCountLocal] =
    useState<Rooms>(roomsQuestsCount);
  const classes = useButtonDropdownCardStyles();

  const roomsCount = roomsQuestsCount.length;
  const adultsCount = Array.from(roomsQuestsCount, (i) => i.adults).length;
  const childrensCount = Array.from(roomsQuestsCount, (i) => i.children).length;

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [arrowRef, setArrowRef] = React.useState(null);
  const [childAge, setChildAge] = React.useState(8);

  const open = Boolean(anchorEl);
  const id = open ? "button-dropdown-card-popper" : undefined;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = (event: any) => {
    if (anchorEl) {
      setAnchorEl(null);
    }
  };

  const addRoom = () => {
    setRoomsQuestsCountLocal((prev) => [
      ...prev,
      {
        adults: 1,
        children: 0,
      },
    ]);
  };

  const save = () => {
    if (isChanged) {
      setRoomsQuestsCount(roomsQuestsCountLocal);
    }
  };

  const isChanged = useMemo(() => {
    if (isEqual(roomsQuestsCountLocal, roomsQuestsCount)) {
      return false;
    }
    return true;
  }, [roomsQuestsCount, roomsQuestsCountLocal]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <Typography
        variant="label"
        sx={{ textTransform: "uppercase", fontWeight: 400 }}
      >
        Гости
      </Typography>

      <Button
        sx={{
          width: "350px",
          height: "57px",
          borderRadius: "10px",
          background: theme.palette.layoutBackground.light,
          padding: "15px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          border: open ? "1px solid #1a1a1a" : "none",
          gap: "15px",
        }}
        aria-describedby={id}
        type="button"
        onClick={handleClick}
      >
        <Typography variant="label" fontWeight={"400"}>
          {adultsCount > 0
            ? `${adultsCount} взрослы${adultsCount === 1 ? "й" : "x"}`
            : null}
          {childrensCount > 0 ? ", " : null}
          {childrensCount >= 5
            ? `${childrensCount} детей`
            : childrensCount > 0
            ? `${childrensCount} ребен${childrensCount === 1 ? "ок" : "ка"}`
            : null}
          {roomsCount > 0 ? `, ${roomsCount} номера` : null}
        </Typography>

        <ArrowDropDownIcon
          sx={{
            fontSize: "20px",
            color: theme.palette.gray.dark,
            transform: `rotate(${open ? "180deg" : 0})`,
          }}
        />
      </Button>

      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        transition
        className={classes.popper}
        modifiers={[
          {
            name: "arrow",
            enabled: true,
            options: {
              element: arrowRef,
            },
          },
        ]}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Fade {...TransitionProps} timeout={350}>
              <Paper elevation={1} className={classes.popoverRoot}>
                <span className={classes.arrow} />
                <Box
                  className={classes.content}
                  sx={{ minWidth: "350px !important" }}
                >
                  <Stack
                    sx={{
                      flexDirection: "column",
                      alignItems: "stretch",
                      gap: "24px",
                    }}
                  >
                    {roomsQuestsCountLocal.map((item, index) => {
                      return (
                        <Stack
                          key={index}
                          sx={{
                            gap: "10px",
                            flexDirection: "column",
                            alignItems: "stretch",
                          }}
                        >
                          <Stack
                            sx={{
                              flexDirection: "row",
                              gap: "24px",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography variant="label">
                              Номер {index + 1}
                            </Typography>

                            <Button></Button>
                          </Stack>

                          <Stack
                            sx={{
                              flexDirection: "row",
                              gap: "24px",
                              justifyContent: "space-between",
                            }}
                          >
                            <CustomCounterButton
                              label={"Взрослые"}
                              minValue={1}
                              maxValue={roomQuestsMax - item.children}
                              value={item.adults}
                              setValue={(val) =>
                                setRoomsQuestsCountLocal(
                                  roomsQuestsCountLocal.map(
                                    (room, room_index) =>
                                      room_index === index
                                        ? { ...room, adults: val }
                                        : room
                                  )
                                )
                              }
                            />

                            <CustomCounterButton
                              label={"Дети (до 12 лет)"}
                              minValue={0}
                              maxValue={roomQuestsMax - item.adults}
                              value={item.children}
                              setValue={(val) =>
                                setRoomsQuestsCountLocal(
                                  roomsQuestsCountLocal.map(
                                    (room, room_index) =>
                                      room_index === index
                                        ? { ...room, children: val }
                                        : room
                                  )
                                )
                              }
                            />
                          </Stack>

                          {/* <CustomSelect
                            inputLabel="Возраст ребенка"
                            selectLabel="Выбрать"
                            value={childAge.toString()}
                            setValue={(val: string) => setChildAge(Number(val))}
                          /> */}
                        </Stack>
                      );
                    })}

                    <Stack
                      sx={{
                        flexDirection: "row",
                        gap: "24px",
                        justifyContent: "space-between",
                      }}
                    >
                      <CustomButton
                        label="Добавить номер"
                        onClick={addRoom}
                        containerVariant="outlined"
                        withoutAnimation
                      />

                      <CustomButton
                        label="Готово"
                        onClick={save}
                        containerBackgroundColor="buttonLight"
                        withoutAnimation
                      />
                    </Stack>
                  </Stack>
                </Box>
              </Paper>
            </Fade>
          </ClickAwayListener>
        )}
      </Popper>
    </Box>
  );
};
