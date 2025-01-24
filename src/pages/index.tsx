import {Redirect} from "@docusaurus/router";
import useBaseUrl from "@docusaurus/useBaseUrl";
import React from "react";

export default function Home(): React.JSX.Element {
  return <Redirect to={useBaseUrl("blog/manage-observability-data-in-petabytes")}/>
}
