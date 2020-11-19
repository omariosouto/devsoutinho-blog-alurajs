import React from 'react';
import { getPostBySlug, getAllPosts } from '../../infra/getAllPosts';

export default function Post({ post }) {
  return (
    <div>
      <h1>{post.title}</h1>

      <div
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  )
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug, [
    'title',
    'content',
  ]);

  return {
    props: {
      post: {
        slug: params.slug,
        ...post,
      },
    },
  }
}

export async function getStaticPaths() {
  const posts = await getAllPosts(['slug'])
  const paths = posts.map((post) => {
    return {
      params: {
        slug: post.slug,
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}