import Footer from '../components/Footer'
import Link from 'next/link';
import { getAllPosts } from '../infra/getAllPosts';

export default function Home({ allPosts }) {
  return (
    <div>
      <header className="headerContainer">
        <img src="https://unavatar.now.sh/github/omariosouto" />
        <h1>
          DevSoutinho's Blog
        </h1>
      </header>

      <section className="postsContainer">
        {allPosts.map((post) => (
          <article key={post.slug} className="postsContainer__post">
            <Link href={`posts/${post.slug}`}>
              <a>
                {post.title}
              </a>
            </Link>
            <p>
              {post.excerpt}
            </p>
          </article>
        ))}
      </section>

      <Footer
        facebook="omariosouto"
        twitter="omariosouto"
        linkedin="omariosouto"
        github="omariosouto"
      />
    </div>
  )
}

export async function getStaticProps() {
  const allPosts = await getAllPosts([
    'title',
    'slug',
    'excerpt',
  ])
  return {
    props: { allPosts },
  }
}
