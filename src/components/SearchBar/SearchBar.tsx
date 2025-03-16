import { FaSearch } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { FormEvent } from "react";
import css from "./SearchBar.module.css";

type Props = {
  onSubmit: (querry: string) => void;
};

const SearchBar = ({ onSubmit }: Props) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const searchInput = form.elements.namedItem("search") as HTMLInputElement;
    if (
      searchInput.value.trim() === "" ||
      /^\s*$/.test(searchInput.value.trim())
    ) {
      return toast.error("Empty request, please write some text.");
    }
    onSubmit(searchInput.value.trim());
    form.reset();
  };

  return (
    <header className={css.search}>
      <div>
        <Toaster position="top-left" reverseOrder={true} />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit">
          <FaSearch />
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
