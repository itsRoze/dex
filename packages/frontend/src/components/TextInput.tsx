import { Component, JSX, splitProps } from "solid-js";
import { Icon } from "./icons";

type TextInputProps = {
  fieldName: string;
  type: "text" | "email" | "tel" | "password" | "url" | "date";
  label?: string;
  placeholder?: string;
  value: string | undefined;
  error: string;
  required?: boolean;
  ref: (element: HTMLInputElement) => void;
  onInput: JSX.EventHandler<HTMLInputElement, InputEvent>;
  onChange: JSX.EventHandler<HTMLInputElement, Event>;
  onBlur: JSX.EventHandler<HTMLInputElement, FocusEvent>;
  Icon: Component<Icon>;
  editable: boolean;
  url?: string;
};

export const TextInput: Component<TextInputProps> = (props) => {
  const [, inputProps] = splitProps(props, ["value", "label", "error"]);
  return (
    <>
      <props.Icon />
      <a href={props.url} target="_blank">
        <input
          {...inputProps}
          id={props.fieldName}
          value={props.value || ""}
          aria-invalid={!!props.error}
          aria-errormessage={`${props.fieldName}-error`}
          disabled={!props.editable}
          classList={{
            "bg-transparent rounded-md font-medium text-sm": true,
            "border-2 border-gray-700 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0":
              props.editable,
            "hover:underline cursor-pointer":
              props.url !== undefined &&
              props.value !== undefined &&
              props.value !== "N/A",
          }}
        />
      </a>
      {props.error && <div id={`${props.fieldName}-error`}>{props.error}</div>}
    </>
  );
};
