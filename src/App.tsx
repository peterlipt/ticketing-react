import axios from "axios";
import { useEffect, useState } from "react";


function App() {
  const [inputValue, setinputValue] = useState<string>('')
  const [count, setCount] = useState(0);
  const onIncrement = () => setCount((prev) => prev + 1);
  const url = 'https://api.ticketing.kir-dev.hu/boards'
  const [isloading, setIsLoading] = useState<boolean>(false);

  const [boards, setBoards] = useState<Board[]>([]);

  const onAdd = () : void => {
    axios.post(url, {
      title: inputValue
    })
    .then(response => {
      getBoards();
    });
  }

  const getBoards = () : void => {
    axios.get(url)
    .then(response => {
      setBoards(response.data);
    });
  }

  useEffect(() => {
    getBoards();
  }, []);

  return (
    <main className="flex items-center justify-center h-screen bg-slate-100">
      <div className="bg-white p-10 rounded-md shadow-lg flex flex-col items-center gap-5">
        <h1 className="font-bold">React Gyakorlat</h1>
        <button
          className="bg-blue-500 text-white font-bold p-5 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition-all duration-300 ease-in-out"
          onClick={onIncrement}
        >
          {count}+++++
        </button>
      </div>
      <div>
        <input value={inputValue} className="border" onChange={
          (e) => setinputValue(e.target.value)
        }/>
        <button className="border" onClick={onAdd}>Add</button>
      </div>
      <div className="overflow-auto">
        {boards.map((boards) => <p key={boards.id}>{boards.title}</p>)}
      </div>
    </main>
  );
}

export default App;
