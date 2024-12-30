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
import { useButtonDropdownCardStyles } from "../../../../../../../components/shared/styles";
import { UndoIcon } from "../../../../../../../../assets/icons/UndoIcon";

interface Props {
  description: string;
}

export const UndoTermsPopup = (props: Props) => {
  const { description } = props;

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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "max-content",
        // alignSelf: "flex-start",
      }}
    >
      <Button
        startIcon={<UndoIcon sx={{ fontSize: "24px" }} />}
        sx={{
          width: "auto",
          minWidth: "auto",
          height: "auto",
          padding: 0,
          background: "transparent",
          marginLeft: "3px",

          "& .MuiButton-startIcon": {
            marginRight: "11px",
            fontSize: "24px",

            "&>*:nth-of-type(1)": {
              fontSize: "24px",
            },
          },
        }}
        aria-describedby={id}
        type="button"
        onClick={handleClick}
      >
        <Typography variant="label" sx={{ textDecoration: "underline" }}>
          Условия отмены
        </Typography>
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
              <Paper
                elevation={1}
                className={classes.popoverRoot}
                sx={{ width: "450px", marginLeft: "10px" }}
              >
                <span className={classes.arrow} />
                <Box className={`${classes.content}`}>
                  <Stack
                    sx={{
                      flexDirection: "column",
                      alignItems: "stretch",
                      gap: "15px",
                    }}
                  >
                    <Typography variant={"label"} sx={{ fontWeight: 600 }}>
                      Условия отмены
                    </Typography>

                    <Typography variant={"body"}>{description}</Typography>
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
