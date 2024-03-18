import { Component, createSignal, onCleanup, onMount } from "solid-js";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  disabled: boolean;
}
export const DeleteModal: Component<Props> = (props) => {
  const [isMounted, setIsMounted] = createSignal(false);

  onMount(() => setIsMounted(true));
  onCleanup(() => setIsMounted(false));

  if (!isMounted) return null;

  return (
    <div
      class={`absolute inset-0 flex items-center justify-center z-50 bg-gray-500/80 transition-colors duration-300 ${
        props.isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div class="border border-gray-900 rounded-md p-2 bg-gray-300 w-1/3">
        <div class="text-center mb-3">
          <p class="text-lg font-medium">Are you sure?</p>
        </div>
        <div class="flex gap-2 justify-center">
          {props.disabled ? (
            <div>...</div>
          ) : (
            <>
              <button
                disabled={props.disabled}
                class="hover:underline"
                onclick={props.onClose}
              >
                No
              </button>
              <button
                disabled={props.disabled}
                class="hover:underline"
                onclick={props.onConfirm}
              >
                Yes
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
