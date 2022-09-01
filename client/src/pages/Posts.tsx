import React from "react";
import { Link, Outlet } from "react-router-dom";
import { PostCard } from "../components/Card/PostCard";

export function Posts() {
  return (
    <div>
      <h1>Blogg</h1>
      <div className="search-and-new">{/* Søke og lag ny post  */}</div>
      <div className="posts-post-wrapper">
        <div className="post-grid posts-wrapper">
          <Link to="/ny">Ny</Link>
          <PostCard />
          {/*Vis alle poster og private poster som ikke er publisert*/}
        </div>
        <Outlet />
      </div>
    </div>
  );
}
