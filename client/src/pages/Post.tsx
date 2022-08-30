import React from "react";
import { Outlet } from "react-router-dom";

export function SinglePost() {
  return (
    <div className="full-width">
      Post
      <Outlet />
    </div>
  );
}
