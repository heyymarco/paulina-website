import type { NextPage } from 'next'
import { Section, MainSection } from '../components/Section'
import { createSheet, globalDef, rules, rule, atRoot, fontFace, layout, vars, mainComposition } from '@cssfn/cssfn'
import { createUseSheet } from '@cssfn/react-cssfn'
import { siteVars } from '../components/config'



const useSheet = createUseSheet(() => [
    mainComposition([
        layout({
            minBlockSize: siteVars.viewportHeight,
        }),
    ]),
])



export default (function Page() {
    const sheet = useSheet();

    return (
        <MainSection classes={[sheet.main]} theme='primary' mild={true}>
            <p>hello world</p>
        </MainSection>
    );
} as NextPage)