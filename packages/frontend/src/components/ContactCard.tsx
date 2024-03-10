import { ContactInfo } from "@dex/db/contact";
import { Component, createSignal } from "solid-js";
import { DeleteModal } from "./delete-modal";
import {
  BlueSky,
  Email,
  LinkedIn,
  Name,
  Notes,
  Phone,
  Place,
  Twitter,
} from "./fields";
import {
  IconBluesky,
  IconCheck,
  IconEmail,
  IconLinkedin,
  IconNote,
  IconPen,
  IconTrash,
  IconTwitter,
  IconUndo,
} from "./icons";

interface IContactCard {
  contact: ContactInfo;
}

export const ContactCard: Component<IContactCard> = (props) => {
  const [modifyHovering, setModifyHovering] = createSignal(false);
  const [deleteModal, setDeleteModal] = createSignal(false);
  const [editMode, setEditMode] = createSignal(false);

  const confirmDelete = () => {
    console.log("deleted");
    setDeleteModal(false);
  };

  const onSaveChanges = () => {
    setEditMode(false);
  };

  return (
    <div
      class={`relative rounded-md border-gray-700 border-2 p-2 max-w-xl w-full ${modifyHovering() ? "bg-white/20 shadow-lg" : ""}`}
    >
      <div class="flex items-center justify-between">
        <div class="flex gap-2 pb-1">
          <Name editMode={editMode()} value={props.contact.name} />
        </div>
        {editMode() ? (
          <DraftButtons
            setEditMode={setEditMode}
            onSaveChanges={onSaveChanges}
          />
        ) : (
          <EditButtons
            setModifyHovering={setModifyHovering}
            setEditMode={setEditMode}
            setDeleteModal={setDeleteModal}
          />
        )}
        {deleteModal() && (
          <DeleteModal
            isOpen={deleteModal()}
            onClose={() => setDeleteModal(false)}
            onConfirm={confirmDelete}
          />
        )}
      </div>
      <hr class="w-full border-gray-800/40 " />
      <div class="grid grid-cols-2 gap-1">
        <div>
          {/* Phone */}
          <div class="flex items-center gap-2 pt-3">
            <Phone editMode={editMode()} value={props.contact.phone} />
          </div>
          {/* Place */}
          <div class="flex items-center gap-2 pt-3">
            <Place editMode={editMode()} value={props.contact.place} />
          </div>
          {/* Twitter */}
          <div class="flex items-center gap-2 pt-3">
            <Twitter editMode={editMode()} value={props.contact.twitter} />
          </div>
          {/* Bluesky */}
          <div class="flex items-center gap-2 pt-3">
            <BlueSky editMode={editMode()} value={props.contact.bluesky} />
          </div>
          {/* LinkedIn */}
          <div class="flex items-center gap-2 pt-3">
            <LinkedIn editMode={editMode()} value={props.contact.linkedin} />
          </div>
        </div>
        <div>
          {/* Email */}
          <div class="flex items-center gap-2 pt-3">
            <Email editMode={editMode()} value={props.contact.email} />
          </div>
          {/* Notes */}
          <div class="flex items-center gap-2 pt-3">
            <Notes editMode={editMode()} value={props.contact.notes} />
          </div>
        </div>
      </div>
    </div>
  );
};

interface IEditButtons {
  setModifyHovering: (hovering: boolean) => void;
  setEditMode: (edit: boolean) => void;
  setDeleteModal: (open: boolean) => void;
}

const EditButtons: Component<IEditButtons> = (props) => {
  return (
    <div
      onMouseEnter={() => props.setModifyHovering(true)}
      onMouseLeave={() => props.setModifyHovering(false)}
      class="flex gap-1"
    >
      {/* Edit */}
      <button
        onclick={() => props.setEditMode(true)}
        class="group hover:rotate-12 "
      >
        <IconPen class="group-hover:rotate-12" />
      </button>
      {/* Delete */}
      <button
        onclick={() => props.setDeleteModal(true)}
        class="group hover:rotate-12 "
      >
        <IconTrash class="group-hover:rotate-12" />
      </button>
    </div>
  );
};

interface IDraftButtons {
  setEditMode: (edit: boolean) => void;
  onSaveChanges: () => void;
}

const DraftButtons: Component<IDraftButtons> = (props) => {
  return (
    <div class="flex gap-1">
      <button onclick={props.onSaveChanges} class="hover:rotate-12">
        <IconCheck />
      </button>
      <button onclick={() => props.setEditMode(false)} class="hover:rotate-12">
        <IconUndo />
      </button>
    </div>
  );
};
