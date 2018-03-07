import { Route } from "react-router";

import InspectorPage from "#SRC/js/inspector/InspectorPage";

const inspectorRoutes = {
  category: "root",
  type: Route,
  path: "inspector",
  component: InspectorPage,
  isInSidebar: true
};

module.exports = inspectorRoutes;
