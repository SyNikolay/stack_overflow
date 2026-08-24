import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface StatusMessageProps {
  icon?: ReactNode;
  title: string;
  description?: ReactNode;
  action?: ReactNode;
}

export const StatusMessage = ({
  icon,
  title,
  description,
  action,
}: StatusMessageProps) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 1.5,
      px: 3,
      py: 6,
      textAlign: "center",
      color: "text.secondary",
    }}
  >
    {icon}
    <Typography variant="h2" color="text.primary">
      {title}
    </Typography>
    {description ? (
      <Typography variant="body2">{description}</Typography>
    ) : null}
    {action}
  </Box>
);
