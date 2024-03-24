import {
  createResource,
  type Component,
  For,
  createSignal,
  onMount,
  createEffect,
} from "solid-js";
import { IconPlus, IconSearch } from "./components/icons";
import { Api } from "./lib/api";
import { ContactCard } from "./components/ContactCard";
import { ContactInfo } from "@dex/db/contact";
import { NewContact } from "./components/NewContact";
import { makePersisted } from "@solid-primitives/storage";

const checkAuth = async (passoword: string | undefined) => {
  if (!passoword) return false;

  const result = await Api.checkPassword(passoword);
  return result;
};

const App: Component = () => {
  const [local, setLocal] = makePersisted(createSignal<string | undefined>(), {
    name: "dex-pass",
  });

  const [passInput, setPassInput] = createSignal<string | undefined>("");
  const [isAuth, setIsAuth] = createSignal(false);

  const handlePassSubmit = async (e: Event) => {
    e.preventDefault();
    if (!passInput()) return;

    const isAuthed = await checkAuth(passInput());
    if (isAuthed) {
      setLocal(passInput());
      setIsAuth(true);
    }
  };

  onMount(async () => {
    if (local()) {
      const isAuthed = await checkAuth(local());
      setIsAuth(isAuthed);
    }
  });

  createEffect(() => {
    console.log("isAuth", isAuth());
  });

  return (
    <>
      {isAuth() ? (
        <DexApp />
      ) : (
        <>
          <h1>Enter password</h1>
          <form onsubmit={handlePassSubmit} class="flex flex-col gap-1">
            <input
              autofocus
              type="password"
              oninput={(e) => setPassInput(e.target.value)}
            />
            <button>Submit</button>
          </form>
        </>
      )}
    </>
  );
};

const DexApp: Component = () => {
  const [contacts, { refetch }] = createResource<ContactInfo[]>(Api.getAll);
  const [newContact, setNewContact] = createSignal(false);

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
        <button class="hover:rotate-12" onclick={() => setNewContact(true)}>
          <IconPlus color="#1f2937" width={32} height={32} />
        </button>
      </header>
      <ul class="px-1 md:px-4 w-full flex flex-col items-center gap-4">
        {newContact() && (
          <NewContact
            show={newContact()}
            setShow={setNewContact}
            refetch={refetch}
          />
        )}
        <For each={contacts()} fallback={<div>No contacts found</div>}>
          {(contact) => <ContactCard contact={contact} refetch={refetch} />}
        </For>
      </ul>
    </main>
  );
};

export default App;
