import Layout from '../../components/layout'
import { getPostData } from '../../lib/articles'
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import Head from 'next/head';
import Image from 'next/image';
import { requestHandler } from '../api/requestHandler';

export default function Post({ postData }) {
    return (

        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <Image src={postData.imageUrl} alt="Picture of the author" width={500} height={500} />
                <video src={postData.videoUrl} controls />
                <div dangerouslySetInnerHTML={{ __html: postData.description }} />
            </article>

        </Layout>
    )
}
export async function getServerSideProps(context) {
    const { query } = context;
    const { id } = query;
    let data = await getPostData(id);
    return {
        props: {
            postData: {
                title: id,
                imageUrl: data.imageUrl,
                videoUrl: data.videoUrl,
                description: data.description
            }
        },
    };
}

