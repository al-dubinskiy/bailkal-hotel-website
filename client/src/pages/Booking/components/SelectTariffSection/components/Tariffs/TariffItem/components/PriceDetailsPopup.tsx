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
import { InfoOutlined, RemoveCircleOutline } from "@mui/icons-material";
import { theme } from "../../../../../../../../theme";
import { useButtonDropdownCardStyles } from "../../../../../../../components/shared/styles";
import moment from "moment";
import { useAppSelector } from "../../../../../../../../hooks/redux";

interface Props {}

export const PriceDetailsPopup = (props: Props) => {
  const {} = props;
  const { filterParams } = useAppSelector((state) => state.bookings);
  const classes = useButtonDropdownCardStyles();

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

  const nightTotal = useMemo(
    () =>
      filterParams.departure_datetime.diff(
        filterParams.arrival_datetime,
        "days"
      ),
    [filterParams]
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <Button
        sx={{
          width: "auto",
          minWidth: "auto",
          height: "auto",
          padding: 0,
          background: "transparent",
        }}
        aria-describedby={id}
        type="button"
        onClick={handleClick}
      >
        <InfoOutlined
          sx={{ fontSize: "24px", color: theme.palette.gray.dark }}
        />
      </Button>

      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        transition
        className={classes.popper}
        // placement="top"
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
                  className={`${classes.content} content`}
                  sx={{ minWidth: "400px !important" }}
                >
                  <Stack
                    sx={{
                      flexDirection: "column",
                      alignItems: "stretch",
                      gap: "15px",
                    }}
                  >
                    <Typography variant={"label"} sx={{ fontWeight: 600 }}>
                      Детализация цены
                    </Typography>

                    <Typography variant={"label"}>
                      {filterParams.arrival_datetime.format("DD MMMM")} —
                      {filterParams.departure_datetime.format("DD MMMM")}
                      <span style={{ fontWeight: 600 }}>
                        {`, ${nightTotal} ноч
                        ${
                          nightTotal === 1 ? "ь" : nightTotal <= 4 ? "и" : "ей"
                        }`}
                      </span>
                      <br></br>2 взрослых — 
                      <span style={{ fontWeight: 600 }}>8220 ₽ за ночь</span>
                    </Typography>
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
