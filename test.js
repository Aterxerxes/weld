import mapper_all from './mapper_all.json' assert { type: 'json' }
import mapper_none from './mapper_none.json' assert { type: 'json' }
import source from './data1.json' assert { type: 'json' }
import { map } from './index.js'

console.log(map({ mapper: mapper_all, source, }))
console.log(map({ mapper: mapper_none, source, }))