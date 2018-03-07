import { Route } from "react-router";

import InspectorPage from "./InspectorPage";

const inspectorRoutes = {
  category: "root",
  type: Route,
  path: "inspector",
  component: InspectorPage,
  isInSidebar: true
};

module.exports = inspectorRoutes;
