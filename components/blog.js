import Image from 'next/image';
import utilStyles from '../styles/utils.module.css';

export default function Blog({ data }) {
    return (
        <>
            <div class="container">
                <div class="row">
                {data.imageUrl ?<div class="col-6" ><Image src={data.imageUrl} alt="Picture of the author" width={500} height={500} /></div>:null}
                <div class="col-6" >
                {data.videoUrl?  <video src={data.videoUrl} controls />:null}
                 {data.description ? <p>{data.description}</p>:null}
                 </div>
                </div>
               
            </div>

        </>

    );
}