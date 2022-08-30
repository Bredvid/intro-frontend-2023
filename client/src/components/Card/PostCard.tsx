import React, { useRef } from "react";
import { Link, To } from "react-router-dom";
import { PostWithAuthor } from "../../../../types";
import { useRequest } from "../../hooks/useRequest";
import { Button } from "../Button";

type Props = {
  link: To;
} & PostWithAuthor;

export function PostCard({
  link,
  createdAt,
  intro,
  title,
  author,
  published,
  viewCount,
  id,
}: Props) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const date = new Date(createdAt).toLocaleString(undefined, {
    dateStyle: "medium",
  });
  const publishPost = useRequest(`/publish/${id}`, "PUT");

  return (
    <article
      onClick={() => {
        cardRef.current?.click();
      }}
      className="card card-link"
    >
      <div className="card-post-count">{viewCount}</div>
      <div>
        <p className="sub-heading">
          Post
          <time dateTime={date}> {date}</time>
        </p>
        <h2>
          <Link className="main-link" ref={cardRef} to={link}>
            {title}
          </Link>
        </h2>
        <p>{intro}</p>
      </div>
      <div className="card-action-wrapper">
        <Link
          className="author-name"
          onClick={(e) => {
            e.stopPropagation();
          }}
          to={{ search: `searchString=${author?.email}` }}
        >
          {author?.avatar && author.name && (
            <img src={author.avatar} alt={author.name} />
          )}
          <span>{author?.name}</span>
        </Link>
        {!published && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              publishPost.makeRequest();
            }}
            variant="link"
          >
            Publiser
          </Button>
        )}
      </div>
    </article>
  );
}
