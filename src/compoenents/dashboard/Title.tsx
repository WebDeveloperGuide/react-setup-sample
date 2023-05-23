import * as React from "react";
import Typography from "@mui/material/Typography";

export default function Title(props: any) {
  const { children } = props;
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {children}
    </Typography>
  );
}
