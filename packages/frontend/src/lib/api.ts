import { type ContactInfo } from "@dex/db/contact/index";
export * as Api from "./api";

export const getAll = async () => {
  const result = await fetch(import.meta.env.VITE_API_URL + "/contacts").then(
    (res) => res.json(),
  );
  return result as ContactInfo[];
};

export const deleteContact = async (id: number) => {
  const result = await fetch(import.meta.env.VITE_API_URL + "/contacts/" + id, {
    method: "DELETE",
  }).then((res) => res.json());

  return result;
};
