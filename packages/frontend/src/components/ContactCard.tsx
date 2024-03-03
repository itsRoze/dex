import { ContactInfo } from "@dex/db/contact";
import { Component, createResource, createSignal } from "solid-js";
import {
  IconUser,
  IconPen,
  IconTrash,
  IconPhone,
  IconMap,
  IconTwitter,
  IconBluesky,
  IconLinkedin,
  IconEmail,
  IconNote,
} from "./icons";
import { Api } from "@/lib/api";
import { DeleteModal } from "./delete-modal";

interface IContactCard {
  contact: ContactInfo;
}

export const ContactCard: Component<IContactCard> = (props) => {
  const [modifyHovering, setModifyHovering] = createSignal(false);
  const [deleteModal, setDeleteModal] = createSignal(false);

  const confirmDelete = () => {
    console.log("deleted");
  };

  return (
    <div
      class={`rounded-md border-gray-700 border-2 p-2 max-w-xl w-full ${modifyHovering() ? "bg-white/20 shadow-lg" : ""}`}
    >
      <div class="flex items-center justify-between">
        <div class="flex gap-2 pb-1">
          <IconUser />
          <p class="font-semibold">{props.contact.name}</p>
        </div>
        <div
          onMouseEnter={() => setModifyHovering(true)}
          onMouseLeave={() => setModifyHovering(false)}
          class="flex gap-1"
        >
          {/* Edit */}
          <button class="group hover:rotate-12 ">
            <IconPen class="group-hover:rotate-12" />
          </button>
          {/* Delete */}
          <button
            onclick={() => setDeleteModal(true)}
            class="group hover:rotate-12 "
          >
            <IconTrash class="group-hover:rotate-12" />
          </button>
          {deleteModal() && (
            <DeleteModal
              isOpen={deleteModal()}
              onClose={() => setDeleteModal(false)}
              onConfirm={confirmDelete}
            />
          )}
        </div>
      </div>
      <hr class="w-full border-gray-800/40 " />
      <div class="grid grid-cols-2 gap-1">
        <div>
          {/* Phone */}
          <div class="flex items-center gap-2 pt-3">
            <IconPhone />
            {props.contact.phone ? (
              <a
                href={`tel:${props.contact.phone}`}
                class="text-sm font-medium hover:underline"
              >
                {formatPhoneNumber(props.contact.phone) || "N/A"}
              </a>
            ) : (
              <span class="text-sm font-medium">N/A</span>
            )}
          </div>
          {/* Place */}
          <div class="flex items-center gap-2 pt-3">
            <IconMap />
            <span class="text-sm font-medium">
              {props.contact.place || "N/A"}
            </span>
          </div>
          {/* Twitter */}
          <div class="flex items-center gap-2 pt-3">
            <IconTwitter />
            {props.contact.twitter ? (
              <a
                href={`https://twitter.com/${props.contact.twitter}`}
                target="_blank"
                class="text-sm font-medium hover:underline"
              >
                {props.contact.twitter}
              </a>
            ) : (
              <span class="text-sm font-medium">N/A</span>
            )}
          </div>
          {/* Bluesky */}
          <div class="flex items-center gap-2 pt-3">
            <IconBluesky />
            {props.contact.bluesky ? (
              <a
                href={`https://bsky.app/profile/${props.contact.bluesky}`}
                target="_blank"
                class="text-sm font-medium hover:underline"
              >
                {props.contact.bluesky}
              </a>
            ) : (
              <span class="text-sm font-medium">N/A</span>
            )}
          </div>
          {/* LinkedIn */}
          <div class="flex items-center gap-2 pt-3">
            <IconLinkedin />
            {props.contact.linkedin ? (
              <a
                href={`https://www.linkedin.com/in/${props.contact.linkedin}`}
                target="_blank"
                class="text-sm font-medium hover:underline"
              >
                {props.contact.linkedin}
              </a>
            ) : (
              <span class="text-sm font-medium">N/A</span>
            )}
          </div>
        </div>
        <div>
          {/* Email */}
          <div class="flex items-center gap-2 pt-3">
            <IconEmail />
            {props.contact.email ? (
              <a
                href={`mailto:${props.contact.email}`}
                class="text-sm font-medium hover:underline"
              >
                {props.contact.email}
              </a>
            ) : (
              <span class="text-sm font-medium">N/A</span>
            )}
          </div>
          {/* Notes */}
          <div class="flex items-center gap-2 pt-3">
            <IconNote />
            <span class="text-sm font-medium">
              {props.contact.notes || "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
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
