import { createResource, type Component, For } from "solid-js";
import { IconSearch } from "./components/icons";
import { Api } from "./lib/api";
import { ContactCard } from "./components/ContactCardNew";
import { ContactInfo } from "@dex/db/contact";

const App: Component = () => {
  const [contacts, { refetch }] = createResource<ContactInfo[]>(Api.getAll);
  return (
    <main class="w-full h-full lg:max-w-4xl flex flex-col md:pt-0 md:px-0 pt-3 px-1 gap-6">
      <header class="flex md:gap-12 gap-2 items-center md:justify-center w-full">
        <img src="/logo.svg" class="md:w-32 md:h-auto w-16 h-auto" />
        <div class="flex items-center justify-stretch border-black border-2 md:px-2 px-1 md:w-1/2 grow md:flex-grow-0 rounded-md">
          <IconSearch />
          <input
            type="text"
            class="grow h-fit md:p-3 p-1 bg-transparent border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder-gray-800"
            placeholder={`Search ${contacts()?.length || 0} contacts`}
          />
        </div>
      </header>
      <ul class="px-1 md:px-4 w-full flex flex-col items-center gap-4">
        <For each={contacts()} fallback={<div>No contacts found</div>}>
          {(contact) => <ContactCard contact={contact} refetch={refetch} />}
        </For>
      </ul>
    </main>
  );
};

export default App;
