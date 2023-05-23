import { Icon } from "@mui/material";
import Dashboard from "compoenents/dashboard/Dashboard";
import Orders from "compoenents/dashboard/Orders";

const routes = [
  {
    key: "darshboard",
    alias: "darshboard",
    route: "/dashboard",
    component: <Dashboard />,
    icon: <Icon fontSize="medium">dashboard</Icon>,
    type: "collapse",
    noCollapse: true,
  },
  {
    key: "deposits",
    alias: "deposits",
    route: "/deposits",
    component: <Orders />,
    icon: <Icon fontSize="medium">dashboard</Icon>,
    type: "no-collapse",
    noCollapse: true,
  },
];

export default routes;
