import React, {
  forwardRef,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { InformationCircleIcon, CheckIcon } from "@heroicons/react/outline";
import { v4 as uuid } from "uuid";
import "./style.css";

type Props = {
  label: string;
  errorMessage?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const InputWithLabel = forwardRef<HTMLInputElement, Props>(
  ({ label, errorMessage, ...inputAttributes }, ref) => {
    const id = uuid();

    return (
      <div
        className={
          !!errorMessage
            ? "input-with-label-error input-with-label"
            : "input-with-label"
        }
      >
        <label htmlFor={`input-${id}`}>{label}</label>
        <div className="input-check-wrapper">
          <input
            {...inputAttributes}
            id={`input-${id}`}
            ref={ref}
            className={"input"}
            aria-invalid={!!errorMessage}
            aria-errormessage={!!errorMessage ? `error-${id}` : undefined}
          />
          {inputAttributes.checked && <CheckIcon className="input-check" />}
        </div>
        <p
          role="alert"
          aria-live="assertive"
          className="input-error-message"
          id={`error-${id}`}
        >
          {errorMessage && (
            <>
              <InformationCircleIcon height="24" />
              {errorMessage}
            </>
          )}
        </p>
      </div>
    );
  },
);

type TextAreaProps = {
  label: string;
  errorMessage?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextAreaWithLabel = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, errorMessage, ...inputAttributes }, ref) => {
    const id = uuid();

    return (
      <div
        className={
          !!errorMessage
            ? "input-with-label-error input-with-label"
            : "input-with-label"
        }
      >
        <label htmlFor={`input-${id}`}>{label}</label>
        <textarea
          {...inputAttributes}
          id={`input-${id}`}
          ref={ref}
          className={"input textarea"}
          aria-invalid={!!errorMessage}
          aria-errormessage={!!errorMessage ? `error-${id}` : undefined}
        />
        <p
          role="alert"
          aria-live="assertive"
          className="input-error-message"
          id={`error-${id}`}
        >
          {errorMessage && (
            <>
              <InformationCircleIcon height="24" />
              {errorMessage}
            </>
          )}
        </p>
      </div>
    );
  },
);
