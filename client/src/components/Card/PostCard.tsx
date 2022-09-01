import React, { useRef } from "react";
import { Link, To } from "react-router-dom";
import { PostWithAuthor } from "../../../../types";

export function PostCard() {
  return (
    <article className="card card-link">
      <div className="card-post-count">22</div>
      <div>
        <p className="sub-heading">
          Post
          <time dateTime={"01/01/2015"}>01.01.2015</time>
        </p>
        <h2>
          <Link className="main-link" to="/post-id">
            Tittel
          </Link>
        </h2>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="card-action-wrapper">
        <div className="author-name">
          <div>LL</div>
          <span>Lars Larsen</span>
        </div>
      </div>
    </article>
  );
}
