import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import remark from 'remark';
import html from 'remark-html';

const postsDirectory = join(process.cwd(), '_posts')

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export async function getPostBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const remarkHTML = await remark().use(html).process(content || '')

  const items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      const contentInHTML = remarkHTML.toString()
    
      items[field] = contentInHTML
    }

    if (data[field]) {
      items[field] = data[field]
    }
  })

  return items
}

export async function getAllPosts(requestFields = []) {
  const fields = [
    ...requestFields,
    'date',
    'status'
  ]
  const slugs = getPostSlugs()
  const posts = await Promise.all(slugs
    .map(async (slug) => await getPostBySlug(slug, fields)));

  return posts
    .filter((post) => (console.log(post), post.status !== 'draft'))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? '-1' : '1'))
}