import { createContext, useState, useMemo } from "react";
import { createTheme, Theme } from "@mui/material/styles";

// color design tokens export
export const tokens = (mode: any) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#3d3d3d",
          800: "#292929",
          900: "#141414",
        },

        primary: {
          100: "#d0d1d5",
          200: "#a1a4ab",
          300: "#727681",
          400: "#333",
          500: "#222",
          600: "#101624",
          700: "#0c101b",
          800: "#080b12",
          900: "#040509",
        },

        secondary: {
          100: "#cce4f1",
          200: "#99c9e2",
          300: "#66afd4",
          400: "#3394c5",
          500: "#0079b7",
          600: "#006192",
          700: "#00496e",
          800: "#003049",
          900: "#001825",
        },

        greenAccent: {
          100: "#dbf5ee",
          200: "#b7ebde",
          300: "#94e2cd",
          400: "#70d8bd",
          500: "#4cceac",
          600: "#3da58a",
          700: "#2e7c67",
          800: "#1e5245",
          900: "#0f2922",
        },

        redAccent: {
          100: "#f8dcdb",
          200: "#f1b9b7",
          300: "#e99592",
          400: "#e2726e",
          500: "#db4f4a",
          600: "#af3f3b",
          700: "#832f2c",
          800: "#58201e",
          900: "#2c100f",
        },

        blueAccent: {
          100: "#cce4f1",
          200: "#99c9e2",
          300: "#66afd4",
          400: "#3394c5",
          500: "#0079b7",
          600: "#006192",
          700: "#00496e",
          800: "#003049",
          900: "#001825",
        },

        yellowAccent: {
          100: "#fff2cc",
          200: "#ffe599",
          300: "#ffd966",
          400: "#ffcc33",
          500: "#ffbf00",
          600: "#cc9900",
          700: "#997300",
          800: "#664c00",
          900: "#332600",
        },
      }
    : {
        grey: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },

        primary: {
          100: "#fcfcfc",
          200: "#f9f9f9",
          300: "#f6f6f6",
          400: "#f3f3f3",
          500: "#f3f0f0",
          600: "#c0c0c0",
          700: "#909090",
          800: "#606060",
          900: "#303030",
        },

        secondary: {
          100: "#d5d5eb",
          200: "#acacd6",
          300: "#8282c2",
          400: "#5959ad",
          500: "#2f2f99",
          600: "#26267a",
          700: "#1c1c5c",
          800: "#13133d",
          900: "#09091f",
        },

        greenAccent: {
          100: "#0f2922",
          200: "#1e5245",
          300: "#2e7c67",
          400: "#3da58a",
          500: "#4cceac",
          600: "#70d8bd",
          700: "#94e2cd",
          800: "#b7ebde",
          900: "#dbf5ee",
        },

        redAccent: {
          100: "#2c100f",
          200: "#58201e",
          300: "#832f2c",
          400: "#af3f3b",
          500: "#db4f4a",
          600: "#e2726e",
          700: "#e99592",
          800: "#f1b9b7",
          900: "#f8dcdb",
        },

        blueAccent: {
          100: "#d5e9f3",
          200: "#abd3e7",
          300: "#82bcda",
          400: "#58a6ce",
          500: "#2e90c2",
          600: "#25739b",
          700: "#1c5674",
          800: "#123a4e",
          900: "#091d27",
        },

        blue: {
          100: "#001825",
          200: "#003049",
          300: "#00496e",
          400: "#006192",
          500: "#0079b7",
          600: "#3394c5",
          700: "#66afd4",
          800: "#99c9e2",
          900: "#cce4f1",
        },

        yellowAccent: {
          900: "#fff2cc",
          800: "#ffe599",
          700: "#ffd966",
          600: "#ffcc33",
          500: "#ffbf00",
          400: "#cc9900",
          300: "#997300",
          200: "#664c00",
          100: "#332600",
        },
      }),
});

// mui theme settings
export const themeSettings = (mode: any) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.secondary[300],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[200],
            },
            background: {
              default: colors.primary[500],
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.secondary[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[200],
            },
            background: {
              default: colors.grey[900],
            },
          }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 14,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
        fontWeight: "bold",
        color: colors.grey[200],
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = (): [
  Theme,
  {
    toggleColorMode: () => void;
  }
] => {
  const [mode, setMode] = useState<string>(
    localStorage.getItem("mode") || "light"
  );

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        const prevMode = localStorage.getItem("mode") || "light";
        const nextMode = prevMode === "light" ? "dark" : "light";
        setMode(nextMode);
        localStorage.setItem("mode", nextMode);
      },
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
