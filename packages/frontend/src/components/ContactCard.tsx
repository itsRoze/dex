import { ContactInfo } from "@dex/db/contact";
import { Component, createSignal } from "solid-js";
import { createForm, SubmitHandler, setValue } from "@modular-forms/solid";
import {
  IconBluesky,
  IconCheck,
  IconEmail,
  IconLinkedin,
  IconMap,
  IconNote,
  IconPen,
  IconPhone,
  IconTrash,
  IconTwitter,
  IconUndo,
  IconUser,
} from "./icons";
import { DeleteModal } from "./delete-modal";
import { Api } from "@/lib/api";
import { TextInput } from "./TextInput";

interface IContactCard {
  contact: ContactInfo;
  refetch: () => void;
}

export type TestContact = {
  name: ContactInfo["name"];
  phone: ContactInfo["phone"];
  place: ContactInfo["place"];
  twitter: ContactInfo["twitter"];
  bluesky: ContactInfo["bluesky"];
  linkedin: ContactInfo["linkedin"];
  email: ContactInfo["email"];
  notes: ContactInfo["notes"];
};

export const ContactCard: Component<IContactCard> = (props) => {
  const [contactForm, { Form, Field }] = createForm<TestContact>();
  const [modifyHovering, setModifyHovering] = createSignal(false);
  const [editable, setEditable] = createSignal(false);
  const [deleteModal, setDeleteModal] = createSignal(false);
  const [isUpdating, setIsUpdating] = createSignal(false);

  const confirmDelete = async () => {
    await Api.deleteContact(props.contact.id);
    setDeleteModal(false);
    setIsUpdating(true);
    props.refetch();
    setIsUpdating(false);
  };

  const handleSubmit: SubmitHandler<TestContact> = async (values, _event) => {
    setIsUpdating(true);
    await Api.editContact({
      id: props.contact.id,
      ...values,
    });
    props.refetch();
    setIsUpdating(false);
    setEditable(false);
  };

  // set intital values
  setValue(contactForm, "name", props.contact.name);
  setValue(contactForm, "phone", props.contact.phone || "N/A");
  setValue(contactForm, "place", props.contact.place || "N/A");
  setValue(contactForm, "twitter", props.contact.twitter || "N/A");
  setValue(contactForm, "bluesky", props.contact.bluesky || "N/A");
  setValue(contactForm, "linkedin", props.contact.linkedin || "N/A");
  setValue(contactForm, "email", props.contact.email || "N/A");
  setValue(contactForm, "notes", props.contact.notes || "N/A");

  return (
    <Form
      onSubmit={handleSubmit}
      class={`relative rounded-md border-gray-700 border-2 p-2 max-w-xl w-full ${modifyHovering() ? "bg-white/20 shadow-lg" : ""}`}
    >
      <div class="flex items-center justify-between">
        <div class="flex gap-2 pb-1 font-semibold">
          <Field name="name">
            {(field, fieldProps) => (
              <TextInput
                {...fieldProps}
                fieldName={fieldProps.name}
                Icon={IconUser}
                editable={editable()}
                type="text"
                value={field.value}
                error={field.error}
                required
              />
            )}
          </Field>
        </div>
        {editable() ? (
          <DraftButtons setEditMode={setEditable} />
        ) : (
          <EditButtons
            setModifyHovering={setModifyHovering}
            setEditMode={setEditable}
            setDeleteModal={setDeleteModal}
          />
        )}
        {deleteModal() && (
          <DeleteModal
            isOpen={deleteModal()}
            onClose={() => setDeleteModal(false)}
            onConfirm={confirmDelete}
            disabled={isUpdating()}
          />
        )}
      </div>
      <hr class="w-full border-gray-800/40 " />
      <div class="grid grid-cols-2 gap-1">
        <div>
          {/* Phone */}
          <div class="flex items-center gap-2 pt-3">
            <Field name="phone">
              {(field, fieldProps) => (
                <TextInput
                  {...fieldProps}
                  fieldName={fieldProps.name}
                  Icon={IconPhone}
                  editable={editable()}
                  placeholder="Phone"
                  type="tel"
                  value={field.value || undefined}
                  error={field.error}
                  url={
                    field.value && field.value !== "N/A"
                      ? `tel:${field.value}`
                      : undefined
                  }
                />
              )}
            </Field>
          </div>
          {/* Place */}
          <div class="flex items-center gap-2 pt-3">
            <Field name="place">
              {(field, fieldProps) => (
                <TextInput
                  {...fieldProps}
                  fieldName={fieldProps.name}
                  Icon={IconMap}
                  editable={editable()}
                  placeholder="Place"
                  type="text"
                  value={field.value || undefined}
                  error={field.error}
                />
              )}
            </Field>
          </div>
          {/* Twitter */}
          <div class="flex items-center gap-2 pt-3">
            <Field name="twitter">
              {(field, fieldProps) => (
                <TextInput
                  {...fieldProps}
                  fieldName={fieldProps.name}
                  Icon={IconTwitter}
                  editable={editable()}
                  placeholder="@"
                  type="text"
                  value={field.value || undefined}
                  error={field.error}
                  url={
                    field.value && field.value !== "N/A"
                      ? `https://twitter.com/${field.value}`
                      : undefined
                  }
                />
              )}
            </Field>
          </div>
          {/* Bluesky */}
          <div class="flex items-center gap-2 pt-3">
            <Field name="bluesky">
              {(field, fieldProps) => (
                <TextInput
                  {...fieldProps}
                  fieldName={fieldProps.name}
                  Icon={IconBluesky}
                  editable={editable()}
                  placeholder="@"
                  type="text"
                  value={field.value || undefined}
                  error={field.error}
                  url={
                    field.value && field.value !== "N/A"
                      ? `https://bsky.app/profile/${field.value}`
                      : undefined
                  }
                />
              )}
            </Field>
          </div>
          {/* LinkedIn */}
          <div class="flex items-center gap-2 pt-3">
            <Field name="linkedin">
              {(field, fieldProps) => (
                <TextInput
                  {...fieldProps}
                  fieldName={fieldProps.name}
                  Icon={IconLinkedin}
                  editable={editable()}
                  placeholder="LinkedIn"
                  type="text"
                  value={field.value || undefined}
                  error={field.error}
                  url={
                    field.value && field.value !== "N/A"
                      ? `https://www.linkedin.com/in/${field.value}`
                      : undefined
                  }
                />
              )}
            </Field>
          </div>
        </div>
        <div>
          {/* Email */}
          <div class="flex items-center gap-2 pt-3">
            <Field name="email">
              {(field, fieldProps) => (
                <TextInput
                  {...fieldProps}
                  fieldName={fieldProps.name}
                  Icon={IconEmail}
                  editable={editable()}
                  placeholder="Email"
                  type="email"
                  value={field.value || undefined}
                  error={field.error}
                  url={
                    field.value && field.value !== "N/A"
                      ? `mailto:${field.value}`
                      : undefined
                  }
                />
              )}
            </Field>
          </div>
          {/* Notes */}
          <div class="flex items-center gap-2 pt-3">
            <Field name="notes">
              {(field, fieldProps) => (
                <TextInput
                  {...fieldProps}
                  fieldName={fieldProps.name}
                  Icon={IconNote}
                  editable={editable()}
                  placeholder="Notes"
                  type="text"
                  value={field.value || undefined}
                  error={field.error}
                />
              )}
            </Field>
          </div>
        </div>
      </div>
    </Form>
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
        type="button"
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
}

const DraftButtons: Component<IDraftButtons> = (props) => {
  return (
    <div class="flex gap-1">
      <button type="submit" class="hover:rotate-12">
        <IconCheck />
      </button>
      <button onclick={() => props.setEditMode(false)} class="hover:rotate-12">
        <IconUndo />
      </button>
    </div>
  );
};
