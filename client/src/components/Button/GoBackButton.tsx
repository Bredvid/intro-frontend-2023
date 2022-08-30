import { ArrowLeftIcon } from "@heroicons/react/outline";
import React from "react";
import { useNavigate, use } from "react-router-dom";
import { Button, ButtonProps } from ".";

export function GoBackButton(props: Omit<ButtonProps, "children">) {
  const navigate = useNavigate();
  return (
    <div className="margin-bottom">
      <Button onClick={() => navigate(-1)} {...props}>
        <div className="button-go-back">
          <ArrowLeftIcon height="1rem" />
          <span>Tilbake</span>
        </div>
      </Button>
    </div>
  );
}
