import Link from "next/link"

const Nav = () => {
  return (
    <nav className="px-20 py-10">
      <div>
        <Link href="/">
          <h1 className="text-xl font-bold">Tic-Tac-Toe</h1>
        </Link>
      </div>
    </nav>
  )
}

export default Nav