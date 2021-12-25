import type { NextPage } from 'next'
import { Section, MainSection } from '../components/Section'
import style from './Home.module.scss'



export default (function Page() {
    return (
        <MainSection classes={[style.hero]} theme='primary' mild={true}>
            <p>hello world</p>
        </MainSection>
    );
} as NextPage)