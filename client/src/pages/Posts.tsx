import React from "react";
import { Outlet } from "react-router-dom";

export function Posts() {
  return (
    <div>
      <h1>Blogg</h1>
      <div className="search-and-new">{/* Søke og lag ny post  */}</div>
      <div className="posts-post-wrapper">
        <div className="post-grid posts-wrapper">
          {/*Vis alle poster og private poster som ikke er publisert*/}
        </div>
        <Outlet />
      </div>
    </div>
  );
}
