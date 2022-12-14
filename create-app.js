#!/usr/bin/env node
import { copyFileSync, renameSync, rmSync } from 'fs'
import { join } from 'path'
import { execSync } from 'child_process'

// This script enhances source files inside /app with a fresh React Native template.
const appName = 'ResponsiveApp'

console.log('⌛ Initializing a fresh RN project...')

execSync(`npx react-native init ${appName}`, {
  stdio: 'inherit',
})

copyFileSync('app/App.js', `${appName}/App.js`)
copyFileSync('app/Expandable.js', `${appName}/Expandable.js`)
copyFileSync('logo.png', `${appName}/logo.png`)

rmSync('app', { recursive: true })

renameSync(appName, 'app')

// Install this package locally, avoiding symlinks.
execSync('npm install $(npm pack .. | tail -1) --legacy-peer-deps', {
  cwd: join(process.cwd(), 'app'),
  stdio: 'inherit',
})

// Additional dependency.
execSync('npm install react-native-cols mobx --legacy-peer-deps', {
  cwd: join(process.cwd(), 'app'),
  stdio: 'inherit',
})

console.log('')
console.log('🍞 React Native App created inside /app.')
console.log('🛠️  To run the example with the plugin included:')
console.log('🐚 cd app')
console.log('🐚 npm run ios / npm run android')
console.log('🌪️  To copy over the changes from the plugin source run:')
console.log('🐚 npm run watch')
console.log('🛠️  This will copy changes over to the app.')
