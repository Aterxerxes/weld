import fs from 'fs/promises'

import { map } from './index.js'

const mapper_all = JSON.parse(await fs.readFile('mapper_all.json'))
const mapper_none = JSON.parse(await fs.readFile('mapper_none.json'))
const source = JSON.parse(await fs.readFile('data1.json'))

console.log(map({ mapper: mapper_all, source, }))
console.log(map({ mapper: mapper_none, source, }))


