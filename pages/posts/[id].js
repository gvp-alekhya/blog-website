import Layout from '../../components/layout'
import Blog from '../../components/blog'
import { getPostData } from '../../lib/articles'
import Head from 'next/head';
import utilStyles from '../../styles/utils.module.css';

import { requestHandler } from '../api/requestHandler';

export default function Post({ postData }) {
    return (

        <Layout title={postData.title}>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <div class="media">
                 <Blog data = {postData}></Blog>
                </div>
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

