import { Route } from "react-router";

import InspectorPage from "#PLUGINS/inspector/components/InspectorPage";

const inspectorRoutes = {
  category: "root",
  type: Route,
  path: "inspector",
  component: InspectorPage,
  isInSidebar: true
};

export default inspectorRoutes;
