export default function Home() {
  return (
    <main className='grid place-items-center h-full'>
      <div className='mt-32'>
        <h1 className='text-center'>Play Tic-Tac-Toe with friends</h1>
        <div className='mt-5 flex gap-5'>
          <button className='p-3 rounded-xl bg-sky-600 hover:bg-sky-700'>Create Room</button>
          <button className='p-3 rounded-xl bg-sky-600 hover:bg-sky-700'>Join Room</button>
        </div>
      </div>
    </main>
  )
}
