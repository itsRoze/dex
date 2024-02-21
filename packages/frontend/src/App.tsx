import { createResource, type Component } from "solid-js";

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
    <>
      <p class="text-4xl text-green-700 text-center py-20">Hello tailwind!</p>
      <p class="text-center">{data()}</p>
    </>
  );
};

export default App;
