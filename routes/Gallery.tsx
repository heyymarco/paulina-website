import type { NextPage } from 'next'
import Head from 'next/head'
import { GenericSection } from '../components/Section'
import { Masonry } from '@nodestrap/masonry'



const Page : NextPage = () => {
    return (<>
        <Head>
            <title>Paulina&apos;s Gallery</title>
            <meta name="description" content="See about Paulina&apos;s photos &amp; videos." />
        </Head>
        <GenericSection theme='primary' mild={true}>
            <article>
                <p>
                    Here the collection of my photos &amp; videos.
                </p>
                <Masonry size='lg' nude={true}>
                    {
                        new Array(30).fill(0).map((arr, index) => (
                            <img key={index} src={`https://picsum.photos/500/${300 + Math.floor(Math.random() * 400)}?random=${Math.floor(Math.random() * 100)}`} alt='' />
                        ))
                    }
                </Masonry>
            </article>
        </GenericSection>
    </>);
}
export default Page;
