import React, { useContext } from "react";
import {
  Autocomplete,
  Button,
  ClickAwayListener,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { theme } from "../../../../theme";

type LocalType = "Ru" | "En";

interface Props {}

export const LocaleButton = (props: Props) => {
  const {} = props;
  const [locale, setLocale] = React.useState<LocalType>("Ru");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (locale: LocalType) => {
    setLocale(locale);
    setAnchorEl(null);
  };
  return (
    <div>
      <ClickAwayListener onClickAway={handleClose}>
        <div>
          <Button
            id="locale-button"
            aria-controls={open ? "locale-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            variant="contained"
            color="buttonLight"
            sx={{
              minWidth: "45px",
              width: "45px",

              "&:hover": {
                opacity: 0.8,
              },
              "&:after": {
                display: "none",
              },
            }}
            onClick={handleClick}
          >
            <Typography variant="label" color="inherit">
              {locale}
            </Typography>
          </Button>
          <Menu
            disablePortal
            id="locale-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            sx={{
              "& .MuiList-root": {
                width: "45px",
                padding: 0,

                "& .MuiButtonBase-root": {
                  height: "50px",
                  justifyContent: "center",
                  padding: "0 10px",
                },
              },
            }}
            MenuListProps={{
              "aria-labelledby": "locale-button",
            }}
            role="menu"
          >
            {locale === "En" ? (
              <MenuItem onClick={() => handleMenuItemClick("Ru")}>
                <Typography variant="label" color="inherit">
                  Ru
                </Typography>
              </MenuItem>
            ) : (
              <MenuItem onClick={() => handleMenuItemClick("En")}>
                <Typography variant="label" color="inherit">
                  En
                </Typography>
              </MenuItem>
            )}
          </Menu>
        </div>
      </ClickAwayListener>
    </div>
  );
};
