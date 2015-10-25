var base58 = require('bs58')
var multihash = require('multihash')

function decodeMultihash (hash) {
  return multihash.decode(new Buffer(base58.decode(hash)))
}

function isIpfsPath (path) {
  try {
    decodeMultihash(getIpfsHash(path))
    return true
  } catch (e) {
    return false
  }
}

function getIpfsHash (path) {
  if (path.startsWith('/ipfs/') || path.startsWith('/ipns/')) {
    path = path.split('/')[2]
  }
  try {
    decodeMultihash(path)
    return path
  } catch (e) {
    throw new Error(`"${path}" is not a valid IPFS path or multihash`)
  }
}
var assertIpfsPath = getIpfsHash

function normalizeIpfsPath (path) {
  assertIpfsPath(path)
  if (path.startsWith('/ipfs/') || path.startsWith('/ipns/')) {
    return path
  }
  return '/ipfs/' + path
}

module.exports = {
  decodeMultihash: decodeMultihash,
  isIpfsPath: isIpfsPath,
  getIpfsHash: getIpfsHash,
  assertIpfsPath: getIpfsHash,
  normalizeIpfsPath: normalizeIpfsPath
}
