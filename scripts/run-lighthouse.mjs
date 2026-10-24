import { execSync } from 'node:child_process'
import { mkdirSync } from 'node:fs'

const outputDirectory = 'lighthouse-reports'

mkdirSync(outputDirectory, { recursive: true })

const targets = [
  { name: 'home-desktop', url: 'http://127.0.0.1:4173/', preset: 'desktop' },
  { name: 'home-mobile', url: 'http://127.0.0.1:4173/', preset: 'mobile' },
  { name: 'nft-detail-desktop', url: 'http://127.0.0.1:4173/nfts/nft-emerald-ape-042', preset: 'desktop' },
]

for (const target of targets) {
  const outputPath = `${outputDirectory}/${target.name}.html`
  const presetFlag = target.preset === 'mobile' ? '--preset=mobile' : '--preset=desktop'

  execSync(
    `npx lighthouse ${target.url} ${presetFlag} --quiet --output html --output-path ${outputPath} --chrome-flags="--headless"`,
    { stdio: 'inherit' },
  )
}

console.log(`Lighthouse reports saved in ${outputDirectory}/`)
