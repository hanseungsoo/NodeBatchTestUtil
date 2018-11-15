const { bkFtcSpec } = require('../batchStyle/messageSpec')

module.exports.lengthChecker = (chunk, style)  => {
    let totalSize
    switch( style ) {
        case 'bkFtc':
            totalSize = chunk.toString().substring(bkFtcSpec.LEN_OFFSET, bkFtcSpec.LEN_OFFSET + bkFtcSpec.LEN_SIZE)
            break
    }

    return parseInt( totalSize )
}

module.exports.zeroPad = (n, width, z) => {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}