import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import Layout from "../../components/layout";
import Date from "../../components/date";

import { getAllPostIds, getPostData } from "../../lib/posts";
import { MDXRemote } from "next-mdx-remote";

import utilStyles from "../../styles/utils.module.css";

const components = { Image, Link };

export default function Post({ postData }) {
  let { source, frontMatter } = postData;
  return (
    <Layout>
      <Head>
        <title>{frontMatter.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{frontMatter.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={frontMatter.date} />
        </div>
        <main>
          <MDXRemote {...source} components={components} />
        </main>
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
