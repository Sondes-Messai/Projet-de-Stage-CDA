import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

const DatagridStyle = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return {
    "& .MuiDataGrid-root": {
      border: "none",
      fontSize: "1rem !important",
    },
    "& .MuiDataGrid-cell, .MuiDataGrid-cell a, .MuiDataGrid-cell svg": {
      borderBottom: "none",
      color: `${theme.palette.text.primary}`,
    },
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: theme.palette.secondary.main,
      borderBottom: "none",
    },
    "& .MuiDataGrid-columnHeaderTitle, .MuiDataGrid-sortIcon, .MuiDataGrid-menuIconButton":
      {
        color: `${theme.palette.primary.main} !important`,
      },
    "& .MuiDataGrid-virtualScroller": {
      backgroundColor: colors.primary[400],
    },
    "& .MuiCheckbox-root": {
      color: `${theme.palette.secondary.main} !important`,
    },
    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
      color: `${theme.palette.primary.main} !important`,
    },
    "& .MuiDataGrid-footerContainer": {
      borderTop: "none",
      backgroundColor: theme.palette.secondary.main,
      color: `${theme.palette.primary.main}!important`,
    },
    "& .MuiTablePagination-root ": {
      color: `${theme.palette.primary.main} !important`,
    },
  };
};

export default DatagridStyle;
