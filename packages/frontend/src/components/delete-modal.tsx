import { Component, createSignal, onCleanup, onMount } from "solid-js";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
export const DeleteModal: Component<Props> = (props) => {
  const [isMounted, setIsMounted] = createSignal(false);

  onMount(() => setIsMounted(true));
  onCleanup(() => setIsMounted(false));

  if (!isMounted) return null;

  return (
    <div
      class={`fixed inset-0 flex items-center justify-center z-50 bg-gray-500/50 transition-opacity duration-300 ${
        props.isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div>
        <div class="text-center mb-3">
          <p class="text-lg font-medium">Are you sure?</p>
        </div>
        <div class="flex justify-between">
          <button onclick={props.onClose}>No</button>
          <button onclick={props.onConfirm}>Yes</button>
        </div>
      </div>
    </div>
  );
};
