import CreateRoomButton from "@/components/createRoomButton";
import JoinRoomButton from "@/components/joinRoomButton";

export default function Home() {
  return (
    <main className='grid place-items-center h-full'>
      <div className='mt-32'>
        <h1 className='text-center'>Play Tic-Tac-Toe with friends</h1>
        <div className='mt-5 flex gap-5'>
          <CreateRoomButton />
          <JoinRoomButton />
        </div>
      </div>
    </main>
  )
}
