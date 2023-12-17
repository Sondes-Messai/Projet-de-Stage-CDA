import React, { ReactNode } from "react";

import { ListItemIcon, MenuItem, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

interface props {
  title: string;
  to: string;
  icon: ReactNode;
}

const Item = ({ title, to, icon }: props) => {
  const navigate = useNavigate();

  return (
    <MenuItem
      onClick={() => {
        navigate(to);
      }}
    >
      <ListItemIcon sx={{ color: "inherit" }}>{icon}</ListItemIcon>
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

export default Item;
