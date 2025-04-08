import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

interface LoaderProps {
  type?: "section" | "table" | "button";
  color?: CircularProgressProps["color"];
  size?: number;
  text?: string;
}
const Loader = ({
  type = "table",
  color = "inherit",
  size,
  text,
}: LoaderProps) => {
  if (type === "section") {
    return (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          // color: "var(--secondary-color)",
        }}
      >
        <CircularProgress color={color} size={size} />
        <p>{text}</p>
      </Box>
    );
  }
  if (type === "table") {
    return (
      <Box
        sx={{
          height: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // color: "var(--secondary-color)",
        }}
      >
        <CircularProgress color={color} size={size} />
      </Box>
    );
  }
  if (type === "button") {
    return (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 5px",
        }}
      >
        <CircularProgress color={color} size={24} />
      </Box>
    );
  }
  return null;
};

export default Loader;
