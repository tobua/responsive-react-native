#!/usr/bin/env node
import { cpSync, renameSync, rmSync } from 'fs'
import { join } from 'path'
import { execSync } from 'child_process'

// Enhances source files inside /app with a fresh RN project template.
const appTemp = 'app-temp'

console.log('⌛ Initializing a fresh RN project...')

// Renaming native folder leads to iOS build issues in some versions.
renameSync('app', appTemp)

execSync('npx react-native init app --skip-git-init true --install-pods false', {
  // Write output to console.
  stdio: 'inherit',
})

cpSync(`${appTemp}/App.tsx`, 'app/App.tsx')
cpSync(`${appTemp}/Expandable.tsx`, 'app/Expandable.tsx')
cpSync(`${appTemp}/global.d.ts`, 'app/global.d.ts')
cpSync('logo.png', 'app/logo.png')

rmSync(appTemp, { recursive: true })

// Run build to ensure distributed files for plugin exist.
execSync('npm run build', {
  stdio: 'inherit',
})

// Install this package locally, avoiding symlinks.
execSync('npm install $(npm pack .. | tail -1)', {
  cwd: join(process.cwd(), 'app'),
  stdio: 'inherit',
})

// Additional dependency.
execSync('npm install react-native-cols mobx', {
  cwd: join(process.cwd(), 'app'),
  stdio: 'inherit',
})

console.log('')
console.log('🍞 React Native App created inside /app.')
console.log('🛠️  To run the example with the plugin included:')
console.log('🐚 cd app')
console.log('🐚 npm run ios / npm run android')
console.log('🐚 cd ios & pod install, as automatic pod installation currently fails.')
console.log('🌪️  To copy over the changes from the plugin source run:')
console.log('🐚 npm run watch')
console.log('🛠️  This will copy changes over to the app.')
