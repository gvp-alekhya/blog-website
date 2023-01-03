import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/articles';
import Link from 'next/link';
// import { S3Client, ListObjectsCommand } from "@aws-sdk/client-s3";


export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
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
