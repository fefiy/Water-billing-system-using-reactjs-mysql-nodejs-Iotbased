import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box gap={"10px"}  width="100%" m="0 30px" textAlign="center">
      <Box>
        <Box>
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
            textAlign={"center"}
            mt="8px"
          >
            {title}
          </Typography>
        </Box>
      </Box>
      <Box mt="10px">
        <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;