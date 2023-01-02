import Image from 'next/image';
import utilStyles from '../styles/utils.module.css';

export default function Blog({ data }) {
    return (
        <>
            <div class="container">
                <div class="row">
                <div class="col-6" ><Image src={data.imageUrl} alt="Picture of the author" width={500} height={500} /></div>
                <div class="col-6" ><video src={data.videoUrl} controls />  <p>{data.description}</p></div>

                </div>
               
            </div>

        </>

    );
}