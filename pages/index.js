import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
//import { getSortedPostsData } from '../lib/posts';
import { getSortedPostsData } from '../lib/articles';
import Link from 'next/link';
import Date from '../components/date';
import { stringify } from 'gray-matter';
// import { S3Client, ListObjectsCommand } from "@aws-sdk/client-s3";


export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hello, I am Alekhya Oruganti, a software engineer.
          <a href="https://www.linkedin.com/in/alekhya-oruganti-b13026108/">
            You can contact me on LinkedIn
          </a>
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map((item) => (
           // <li>{JSON.stringify(item)}</li>
            <div key={item.name}>
                <li key={item.name["S"]}>
                 <Link href={`/posts/${encodeURIComponent(item.name['S'])}`}>{item.name['S']}</Link>
                </li>              
            </div>
          ))}
        </ul>
      </section>

    </Layout>
  );
}
export async function getServerSideProps() {
  const data = await getSortedPostsData();
  return {
    props: {
      allPostsData: data.Items,
    },
  };
}
