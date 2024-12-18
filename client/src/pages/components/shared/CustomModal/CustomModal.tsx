import { Box, Modal, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { theme } from "../../../../theme";
import { CustomButton } from "../CustomButton";
import { CloseOutlined } from "@mui/icons-material";
import { CustomCircleIconButton } from "../CustomCircleIconButton";

interface Props {
  modalTitle: string;
  modalDescription?: string;
  modalContent: React.ReactElement;
  open: boolean;
  setOpen: (val: boolean) => void;
  actionButtonsVariants: "yes_no" | "continue_close" | "save_cancel";
  handleConfirm: () => null;
}

export const CustomModal = (props: Props) => {
  const {
    modalTitle,
    modalDescription,
    modalContent,
    open,
    setOpen,
    actionButtonsVariants,
    handleConfirm,
  } = props;

  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: theme.palette.layoutBackground.light,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          borderRadius: "16px",
        }}
      >
        <CustomCircleIconButton
          icon={<CloseOutlined />}
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: "24px",
            right: "24px",
            zIndex: 1,
          }}
        />
        <Typography
          id="modal-modal-title"
          variant="label"
          sx={{ fontWeight: "600" }}
        >
          {modalTitle}
        </Typography>

        {modalDescription ? (
          <Typography
            id="modal-modal-description"
            variant="label"
            sx={{ marginTop: "24px" }}
          >
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        ) : null}

        {modalContent}

        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: "24px",
            marginTop: "24px",
          }}
        >
          <CustomButton
            label={
              actionButtonsVariants === "continue_close"
                ? "Продолжить"
                : actionButtonsVariants === "save_cancel"
                ? "Cохранить"
                : actionButtonsVariants === "yes_no"
                ? "Да"
                : ""
            }
            onClick={handleConfirm}
            containerVariant={"contained"}
            containerBackgroundColor={"buttonDark"}
            containerStyle={{ padding: "0 40px" }}
            withoutAnimation
          />

          <CustomButton
            label={
              actionButtonsVariants === "continue_close"
                ? "Закрыть"
                : actionButtonsVariants === "save_cancel"
                ? "Отменить"
                : actionButtonsVariants === "yes_no"
                ? "Нет"
                : ""
            }
            onClick={handleClose}
            containerVariant={"outlined"}
            containerBackgroundColor={"buttonDark"}
            containerStyle={{ padding: "0 40px" }}
            withoutAnimation
          />
        </Stack>
      </Box>
    </Modal>
  );
};
