import { createTheme, MantineTheme, MantineThemeOverride } from "@mantine/core"

export const portalTheme: MantineThemeOverride = createTheme({
  primaryColor: "green",
  primaryShade: { light: 4, dark: 7 },
  colors: {
    dark: [
      "#C1C2C5",
      "#A6A7AB",
      "#909296",
      "#5c5f66",
      "#373A40",
      "#2C2E33",
      "#25262b",
      "#27292F",
      "#242224",
      "#1A1B1E",
    ],
    gray: [
      "#FAFAFA",
      "#f1f3f5",
      "#EBECED",
      "#E3E8ED",
      "#ced4da",
      "#adb5bd",
      "#808B95",
      "#495057",
      "#343438",
      "#202024",
    ],
    blue: [
      "#F0F6FC",
      "#d0ebff",
      "#a5d8ff",
      "#74c0fc",
      "#33B0FF",
      "#339af0",
      "#228be6",
      "#1D8AED",
      "#1971c2",
      "#005099",
    ],
    green: [
      "#ebfbee",
      "#d3f9d8",
      "#b2f2bb",
      "#8ce99a",
      "#65C971",
      "#46BD6B",
      "#40c057",
      "#389F58",
      "#2f9e44",
      "#2b8a3e",
    ],
    yellow: [
      "#fff9db",
      "#fff3bf",
      "#ffec99",
      "#ffe066",
      "#ffd43b",
      "#fcc419",
      "#fab005",
      "#E1A43E",
      "#f08c00",
      "#e67700",
    ],
    orange: [
      "#fff4e6",
      "#ffe8cc",
      "#ffd8a8",
      "#ffc078",
      "#ffa94d",
      "#ff922b",
      "#fd7e14",
      "#f76707",
      "#e8590c",
      "#D65745",
    ],
    navy: [
      "#EBEAEF",
      "#A4A7AC",
      "#e9ecef",
      "#dee2e6",
      "#26282B",
      "#161D25",
      "#10161C",
      "#0B0E12",
      "#05070A",
      "#000000",
    ],
    magenta: [
      "#E5C0EA",
      "#CE88D6",
      "#C46FCD",
      "#B044BB",
      "#A733B2",
      "#9E26A9",
      "#961DA1",
      "#871990",
      "#771581",
      "#681170",
    ],
  },
  components: {
    Menu: {
      defaultProps: {
        position: "bottom-end",
      },
      styles: () => ({
        dropdown: {
          maxHeight: "400px",
          minWidth: "165px",
          overflow: "auto",
          backgroundColor: "var(--mantine-color-body)",
        },
      }),
    },
    Text: {
      defaultProps: {
        fz: "sm",
      },
      styles: {
        root: {
          margin: 0,
        },
      },
    },
    Button: {
      defaultProps: {
        size: "md",
        radius: "xl",
        fw: "400",
        fz: "sm",
      },
    },
    Badge: {
      defaultProps: {
        color: "gray",
        fw: 400,
        fz: "xs",
      },
      styles: () => ({
        root: { backgroundColor: "var(--mantine-color-navy-4)" },
      }),
    },
    Divider: {
      defaultProps: { opacity: "50%" },
    },
    TextInput: {
      defaultProps: {
        radius: "sm",
      },
      styles: {
        input: {
          backgroundColor: "transparent",
        },
      },
    },
    Input: {
      styles: {
        input: {
          backgroundColor: "transparent",
        },
      },
    },
    CloseButton: {
      defaultProps: {
        size: "md",
      },
    },
    Card: {
      styles: () => ({
        root: {
          backgroundColor: "var(--mantine-color-body)",
        },
      }),
    },
    Notification: {
      defaultProps: {
        py: 12,
        px: 15,
        radius: 8,
      },
      styles: (theme: MantineTheme) => ({
        root: {
          backgroundColor: theme.colors.dark[9],
          border: "1px solid",
        },
      }),
    },
    Drawer: {
      defaultProps: {
        overlayProps: { opacity: 0.8, color: "var(--mantine-color-navy-9)" },
      },
    },
  },
})
