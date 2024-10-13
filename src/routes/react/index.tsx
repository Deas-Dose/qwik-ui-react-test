import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { TableApp } from "~/integrations/react/mui";
import { Modal } from '@qwik-ui/headless';

export default component$(() => {
  const show = useSignal(false);
  const count = useSignal(0);
  const variant = useSignal<"contained" | "outlined" | "text">("contained");

  return (
    <>
      <h1>Qwik/React mother of all demos</h1>
      <select
        value={variant.value}
        onChange$={(ev) => {
          variant.value = (ev.target as any).value;
        }}
      >
        <option>text</option>
        <option>outlined</option>
        <option selected>contained</option>
      </select>

      
      <Modal.Root>
      <Modal.Trigger class="modal-trigger">Open Modal</Modal.Trigger>
      <Modal.Panel class="modal-panel">
        <Modal.Title>Edit Profile</Modal.Title>
        <Modal.Description>
          You can update your profile here. Hit the save button when finished.
          
        </Modal.Description>
        <TableApp client:visible></TableApp>
        <footer>
          <Modal.Close class="modal-close">Cancel</Modal.Close>
          <Modal.Close class="modal-close">Save Changes</Modal.Close>
        </footer>
      </Modal.Panel>
    </Modal.Root>

      <button onClick$={() => (show.value = true)}>Show table</button>
      {show.value && (
        <TableApp client:visible>Slider is {count.value}</TableApp>
      )}
    </>
  );
});

export const head: DocumentHead = {
  title: "Qwik React",
};
