import React, { useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
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
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { RemoveCircleOutline } from "@mui/icons-material";
import { RoomGuestsCountType } from "../../../../redux/slices/Bookings/types";
import { setFilterParams } from "../../../../redux/slices/Bookings/bookingsSlice";

type Rooms = RoomGuestsCountType[];

interface Props {}

export const SelectGuestsDropdown = (props: Props) => {
  const {} = props;
  const dispatch = useAppDispatch();
  const { roomGuestsMax, filterParams } = useAppSelector(
    (state) => state.bookings
  );

  const { rooms } = filterParams;

  const [roomsGuestsCountLocal, setRoomsGuestsCountLocal] =
    useState<Rooms>(rooms);
  const classes = useButtonDropdownCardStyles();

  const roomsCount = rooms.length;
  const adultsCount = Array.from(rooms, (i) => i.adults).reduce(
    (acc, cur) => acc + cur
  );
  const childrensCount = Array.from(rooms, (i) => i.children).reduce(
    (acc, cur) => acc + cur
  );

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [arrowRef, setArrowRef] = React.useState(null);

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
    setRoomsGuestsCountLocal((prev) => [
      ...prev,
      {
        id: uuidv4(),
        adults: 1,
        children: 0,
      },
    ]);
  };

  const removeRoom = (index: number) => {
    if (roomsGuestsCountLocal.length > 1) {
      setRoomsGuestsCountLocal((prev) =>
        prev.filter((_, idx) => idx !== index)
      );
    }
  };

  const save = () => {
    if (isChanged) {
      dispatch(
        setFilterParams({
          ...filterParams,
          rooms: roomsGuestsCountLocal,
        })
      );
    }
  };

  const isChanged = useMemo(() => {
    if (isEqual(roomsGuestsCountLocal, rooms)) {
      return false;
    }
    return true;
  }, [rooms, roomsGuestsCountLocal]);

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
          border: open ? `1px solid ${theme.palette.primary.dark}` : "none",
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
          {roomsCount > 0
            ? `, ${roomsCount} номер${
                roomsCount === 1 ? "" : roomsCount > 4 ? "ов" : "a"
              }`
            : null}
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
                    {roomsGuestsCountLocal.map((item, index) => {
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

                            {roomsGuestsCountLocal.length > 1 ? (
                              <Button onClick={() => removeRoom(index)}>
                                <RemoveCircleOutline />
                              </Button>
                            ) : null}
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
                              maxValue={roomGuestsMax - item.children}
                              value={item.adults}
                              setValue={(val) =>
                                setRoomsGuestsCountLocal(
                                  roomsGuestsCountLocal.map(
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
                              maxValue={roomGuestsMax - item.adults}
                              value={item.children}
                              setValue={(val) =>
                                setRoomsGuestsCountLocal(
                                  roomsGuestsCountLocal.map(
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
