import { Component, createSignal } from "solid-js";
import {
  createForm,
  SubmitHandler,
  FormError,
  required,
} from "@modular-forms/solid";
import { TestContact } from "./ContactCardNew";
import { TextInput } from "./TextInput";
import {
  IconBluesky,
  IconCheck,
  IconEmail,
  IconLinkedin,
  IconMap,
  IconNote,
  IconPhone,
  IconTwitter,
  IconUndo,
  IconUser,
} from "./icons";
import { Api } from "@/lib/api";

interface Props {
  show: boolean;
  setShow: (show: boolean) => void;
  refetch: () => void;
}

export const NewContact: Component<Props> = (props) => {
  const [contactForm, { Form, Field }] = createForm<TestContact>();
  const [isUpdating, setIsUpdating] = createSignal(false);

  const handleSubmit: SubmitHandler<TestContact> = async (values, _event) => {
    if (isUpdating()) return;

    try {
      setIsUpdating(true);
      await Api.createContact(values);
      props.refetch();
      setIsUpdating(false);
      props.setShow(false);
    } catch (e) {
      setIsUpdating(false);
      throw new FormError<TestContact>("An error has occurred.");
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      class={`relative rounded-md border-gray-700 border-2 p-2 max-w-xl w-full`}
    >
      <p>{contactForm.response.message}</p>
      <div class="flex items-center justify-between">
        <div class="flex gap-2 pb-1 font-semibold">
          <Field name="name" validate={[required("Name is required")]}>
            {(field, fieldProps) => (
              <TextInput
                {...fieldProps}
                placeholder="Name"
                fieldName={fieldProps.name}
                Icon={IconUser}
                editable={true}
                type="text"
                value={field.value}
                error={field.error}
                required
              />
            )}
          </Field>
        </div>
        <DraftButtons setEditMode={props.setShow} />
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
                  editable={true}
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
                  editable={true}
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
                  editable={true}
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
                  editable={true}
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
                  editable={true}
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
                  editable={true}
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
                  editable={true}
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

interface IDraftButtons {
  setEditMode: (edit: boolean) => void;
}

const DraftButtons: Component<IDraftButtons> = (props) => {
  return (
    <div class="flex gap-1">
      <button type="submit" class="hover:rotate-12">
        <IconCheck />
      </button>
      <button
        type="button"
        onclick={() => props.setEditMode(false)}
        class="hover:rotate-12"
      >
        <IconUndo />
      </button>
    </div>
  );
};
