export const AsidePanel = (): JSX.Element => {
  return (
    <div className='m-5 p-5 border border-sky-500'>
      <label className="block font-semibold mb-2">Search by title:</label>
      <input type="text" className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Search..." />

      <label className="block font-semibold mt-4 mb-2">Filter by Date:</label>
      <input type="date" className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />

      <label className="block font-semibold mt-4 mb-2">Filter by Age:</label>
      <select className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
        <option value="under-18">Under 18</option>
        <option value="18-24">18-24</option>
        <option value="25-34">25-34</option>
        <option value="over-34">Over 34</option>
      </select>

      <label className="block font-semibold mt-4 mb-2">Filter by Game:</label>
      <select className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
        <option value="lol">League of Legends</option>
        <option value="cs">Counter-Strike</option>
        <option value="valorant">Valorant</option>
      </select>
    </div>
  );
}