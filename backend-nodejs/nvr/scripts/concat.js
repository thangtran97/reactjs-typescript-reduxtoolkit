const videoConcat = require('../video-concat');

const args = process.argv.slice(2);
const directory = args[0];

console.log(`Combining files in ${directory}...`);

videoConcat.combineFilesInDirectory(directory).then(() => {
    console.log('Complete');
}).catch(err => {
    console.log(err);
})
