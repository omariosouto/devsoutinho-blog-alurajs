import Link from 'next/link';

export default function Sobre({ allPosts }) {
  return (
    <div>
      <main>
        <h1>
          Sobre
        </h1>
        <p>
          Ainda não temos conteúdo para essa página :(
        </p>
      </main>

      <Link href="/">
        <a>
          Voltar pra home
        </a>
      </Link>
    </div>
  )
}
