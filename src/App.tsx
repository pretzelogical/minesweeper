import Board from "./components/Board"


function App() {

  return (
    <div className="flex flex-col h-full">
      <h1 className='text-xl text-center'>Minesweeper</h1>

      <Board />
    </div>
  )
}

export default App
