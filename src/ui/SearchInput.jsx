import { HiX } from "react-icons/hi";
import ButtonIcon from "./ButtonIcon";
import { useNavigate } from "react-router-dom";

function SearchInput({
  searchinput,
  setSearchInput,
  refetch,
  setShowSearchResult,
  showSearchResult,
}) {
  const navigate = useNavigate();
  // const { pathname } = useLocation();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    refetch();
    setShowSearchResult(true);
    navigate(`/chat/search/${searchinput}`);
  };

  return (
    <div className="flex items-center justify-between gap-1">
      <form className="w-full" onSubmit={onSubmitHandler}>
        <input
          type="text"
          className="h-[40px] w-full rounded-lg border-2 border-[#c7c6c6] indent-3 text-sm"
          name="search_input"
          placeholder="Search..."
          value={searchinput}
          onChange={(text) => setSearchInput(text.target.value)}
        />
      </form>
      {showSearchResult && (
        <ButtonIcon
          onClick={() => {
            setShowSearchResult(false);
            setSearchInput("");
            navigate(`/`);
          }}
          buttonStyle={
            "top-[50px] flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-slate-400"
          }
        >
          <HiX size={20} color="#fff" />
        </ButtonIcon>
      )}
    </div>
  );
}

export default SearchInput;
