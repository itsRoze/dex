import { createResource, type Component } from "solid-js";
import { IconSearch } from "./icons/search";

const fetchData = async () => {
  console.log(import.meta.env.VITE_API_URL);
  const result = await fetch(import.meta.env.VITE_API_URL).then((res) =>
    res.text(),
  );
  return result;
};

const App: Component = () => {
  const [data] = createResource(fetchData);
  return (
    <main class="w-full h-full lg:max-w-4xl flex flex-col items-center">
      <header class="flex gap-12 items-center justify-center w-full">
        <img src="/logo.svg" class="w-32 h-32" />
        <div class="flex items-center justify-stretch border-black border-2 px-2 w-1/2 rounded-md">
          <IconSearch />
          <input
            type="text"
            class="grow h-fit p-3 bg-transparent border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </header>
    </main>
  );
};

export default App;
