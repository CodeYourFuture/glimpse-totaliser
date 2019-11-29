import React from "react";
import { Link } from "@reach/router";

export default () => (
  <>
    <h1>Totalisers</h1>
    <ul>
      <li>
        <Link to="/uk">UK store</Link>
      </li>
      <li>
        <Link to="/us">US store</Link>
      </li>
      <li>
        <Link to="/dev-uk">UK dev store</Link>
      </li>
      <li>
        <Link to="/dev-us">US dev store</Link>
      </li>
    </ul>
  </>
);
