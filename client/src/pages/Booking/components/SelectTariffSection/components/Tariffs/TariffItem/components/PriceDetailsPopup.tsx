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
import { BookingDateType } from "../../../../SelectTariffSection";
import moment from "moment";

interface Props {
  bookingDate: BookingDateType;
}

export const PriceDetailsPopup = (props: Props) => {
  const { bookingDate } = props;

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
    () => moment(bookingDate.departure.diff(bookingDate.arrival, "days")),
    [bookingDate]
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
                      {bookingDate.arrival.format("DD MMMM")} —
                      {bookingDate.departure.format("DD MMMM")}
                      <span style={{ fontWeight: 600 }}>, 1 ночь</span>
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
