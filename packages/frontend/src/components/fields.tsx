import { Component } from "solid-js";
import {
  IconUser,
  IconPhone,
  IconMap,
  IconTwitter,
  IconBluesky,
  IconLinkedin,
  IconEmail,
  IconNote,
} from "./icons";

interface IEditableField {
  value: string | null | undefined;
  placeholder: string;
  type?: HTMLInputElement["type"];
}

export const EditableField: Component<IEditableField> = (props) => {
  return (
    <input
      type={props.type || "text"}
      value={props.value || ""}
      placeholder={props.placeholder}
      class="bg-transparent border-2 border-gray-700 rounded-md  placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
    />
  );
};

interface IField {
  editMode: boolean;
  value: string | null | undefined;
}

export const Name: Component<IField> = (props) => {
  return (
    <>
      <IconUser />
      {props.editMode ? (
        <EditableField type="text" placeholder="Name..." value={props.value} />
      ) : (
        <p class="font-semibold">{props.value}</p>
      )}
    </>
  );
};

export const Phone: Component<IField> = (props) => {
  return (
    <>
      <IconPhone />
      {props.editMode ? (
        <EditableField type="tel" placeholder="Phone..." value={props.value} />
      ) : props.value ? (
        <a
          href={`tel:${props.value}`}
          class="text-sm font-medium hover:underline"
        >
          {formatPhoneNumber(props.value) || "N/A"}
        </a>
      ) : (
        <span class="text-sm font-medium">N/A</span>
      )}
    </>
  );
};

export const Place: Component<IField> = (props) => {
  return (
    <>
      <IconMap />
      {props.editMode ? (
        <EditableField type="text" placeholder="Place..." value={props.value} />
      ) : (
        <span class="text-sm font-medium">{props.value || "N/A"}</span>
      )}
    </>
  );
};

export const Twitter: Component<IField> = (props) => {
  return (
    <>
      <IconTwitter />
      {props.editMode ? (
        <EditableField
          type="text"
          placeholder="Twitter..."
          value={props.value}
        />
      ) : props.value ? (
        <a
          href={`https://twitter.com/${props.value}`}
          target="_blank"
          class="text-sm font-medium hover:underline"
        >
          {props.value}
        </a>
      ) : (
        <span class="text-sm font-medium">N/A</span>
      )}
    </>
  );
};

export const BlueSky: Component<IField> = (props) => {
  return (
    <>
      <IconBluesky />
      {props.editMode ? (
        <EditableField
          type="text"
          placeholder="Bluesky..."
          value={props.value}
        />
      ) : props.value ? (
        <a
          href={`https://bsky.app/profile/${props.value}`}
          target="_blank"
          class="text-sm font-medium hover:underline"
        >
          {props.value}
        </a>
      ) : (
        <span class="text-sm font-medium">N/A</span>
      )}
    </>
  );
};

export const LinkedIn: Component<IField> = (props) => {
  return (
    <>
      <IconLinkedin />
      {props.editMode ? (
        <EditableField
          type="text"
          placeholder="LinkedIn..."
          value={props.value}
        />
      ) : props.value ? (
        <a
          href={`https://www.linkedin.com/in/${props.value}`}
          target="_blank"
          class="text-sm font-medium hover:underline"
        >
          {props.value}
        </a>
      ) : (
        <span class="text-sm font-medium">N/A</span>
      )}
    </>
  );
};

export const Email: Component<IField> = (props) => {
  return (
    <>
      <IconEmail />
      {props.editMode ? (
        <EditableField
          type="email"
          placeholder="Email..."
          value={props.value}
        />
      ) : props.value ? (
        <a
          href={`mailto:${props.value}`}
          target="_blank"
          class="text-sm font-medium hover:underline"
        >
          {props.value}
        </a>
      ) : (
        <span class="text-sm font-medium">N/A</span>
      )}
    </>
  );
};

export const Notes: Component<IField> = (props) => {
  return (
    <>
      <IconNote />
      {props.editMode ? (
        <EditableField type="text" placeholder="Notes..." value={props.value} />
      ) : (
        <span class="text-sm font-medium">{props.value || "N/A"}</span>
      )}
    </>
  );
};

const formatPhoneNumber = (phoneNumber: string | null | undefined) => {
  if (!phoneNumber) {
    return phoneNumber;
  }
  // Remove all non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, "");

  // Apply formatting based on the length of the cleaned number
  let formattedNumber = "";
  if (cleaned.length === 10) {
    formattedNumber = cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  } else if (cleaned.length === 11 && cleaned.startsWith("1")) {
    formattedNumber = cleaned.replace(
      /(\d{1})(\d{3})(\d{3})(\d{4})/,
      "+$1 ($2) $3-$4",
    );
  } else {
    // Invalid phone number
    formattedNumber = cleaned;
  }

  return formattedNumber;
};
