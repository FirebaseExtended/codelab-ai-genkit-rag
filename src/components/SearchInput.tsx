import { Search } from './svg';

export default function SearchInput() {
  return (
    <label className="relative flex items-center justify-center w-full">
      <input
        type="text"
        className="rounded-xl text-lg leading-[1] border border-gray-100 pl-14 pr-5 mr-[50px] py-5 w-full placeholder-gray-400 focus:outline-foreground"
        placeholder="Search destination"
      />
      <span className="absolute left-5 top-1/2 -translate-y-1/2 rounded-lg pointer-events-none">
        <Search />
      </span>
    </label>
  );
}
