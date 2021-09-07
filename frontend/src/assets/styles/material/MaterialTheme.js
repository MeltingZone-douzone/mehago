import { createTheme } from "@material-ui/core";
import { colors } from "../properties/Colors";

export const theme = createTheme({
    palette: {
        primary : { main : colors.mainThemeColor, light : "#e64980" },
        secondary : { main : colors.subThemeColor },
        error : {main : "#e64980"}
    }
});