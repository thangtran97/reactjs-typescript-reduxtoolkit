const nodeDiskInfo = require('node-disk-info');

// async
nodeDiskInfo.getDiskInfo()
    .then(disks => {
        printResults('ASYNC WAY', disks);
    })
    .catch(reason => {
        console.error(reason);
    });

// sync
try {
    const disks = nodeDiskInfo.getDiskInfoSync();
    printResults('SYNC WAY', disks);
} catch (err) {
    console.error(err);
}

function printResults(title, disks) {

    console.log(`============ ${title} ==============\n`);

    for (const disk of disks) {
        console.log('Filesystem:', disk.filesystem);
        console.log('Blocks:', disk.blocks);
        console.log('Used:', disk.used);
        console.log('Available:', disk.available);
        console.log('Capacity:', disk.capacity);
        console.log('Mounted:', disk.mounted, '\n');
    }

}