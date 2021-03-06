/* global ethers hre */

require('dotenv').config()

async function main () {
  const aavegotchiDiamondAddress = '0x86935F11C86623deC8a25696E1C19a8659CbF95d'
  const vouchersAbi = [
    'event TransferSingle(address indexed _operator, address indexed _from, address indexed _to, uint256 _id, uint256 _value)',
    'event TransferBatch(address indexed _operator, address indexed _from, address indexed _to, uint256[] _ids, uint256[] _values)',
    'function balanceOfAll(address _owner) external view returns (uint256[] memory balances_)'
  ]

  const ethereumProvider = new ethers.providers.JsonRpcProvider(process.env.MAINNET_URL)

  const vouchersContract = await ethers.getContractAt(vouchersAbi, '0xe54891774EED9277236bac10d82788aee0Aed313', ethereumProvider)
  let vounchersFilter = vouchersContract.filters.TransferSingle()
  let transfers = await vouchersContract.queryFilter(vounchersFilter, 11230220)

  const owners = new Map()
  const ownerAddresses = new Set()
  const itemMapping = new Map()
  for (let i = 0; i < 54; i++) {
    itemMapping.set(i.toString(), i + 1)
  }
  // console.log('mapping size:', itemMapping.size)
  // const keys = [...itemMapping.keys()]
  // const length = keys.length
  // console.log('keys length:', length)
  // for (let i = 0; i < length; i++) {
  //   console.log(keys[i] + '|' + itemMapping.get(keys[i]))
  // }

  function addTransferInfo (to, from, id, value) {
    id = id.toString()
    ownerAddresses.add(to)
    // ownerAddresses.add(from)
    let toItems = owners.get(to)
    if (toItems === undefined) {
      toItems = new Map()
      owners.set(to, toItems)
    }
    let fromItems = owners.get(from)
    if (fromItems === undefined) {
      fromItems = new Map()
      owners.set(from, fromItems)
    }

    const toItemBalance = toItems.get(id)
    if (toItemBalance === undefined) {
      toItems.set(id, value)
    } else {
      toItems.set(id, toItemBalance.add(value))
    }

    const fromItemBalance = fromItems.get(id)
    if (fromItemBalance === undefined) {
      fromItems.set(id, value.mul(-1))
    } else {
      fromItems.set(id, fromItemBalance.sub(value))
    }
  }

  for (const transfer of transfers) {
    addTransferInfo(transfer.args._to, transfer.args._from, transfer.args._id, transfer.args._value)
  }

  vounchersFilter = vouchersContract.filters.TransferBatch()
  transfers = await vouchersContract.queryFilter(vounchersFilter, 11230220)
  // console.log(transfers)
  for (const transfer of transfers) {
    ownerAddresses.add(transfer.args._to)
    const ids = transfer.args._ids
    const values = transfer.args._values
    for (let i = 0; i < ids.length; i++) {
      addTransferInfo(transfer.args._to, transfer.args._from, ids[i], values[i])
    }
  }

  // console.log(owners.get(ethers.constants.AddressZero))

  const addOwners = []
  let addOwnersBatch = []
  addOwners.push(addOwnersBatch)
  let count = 0
  for (const [owner, items] of owners.entries()) {
    if ([
      ethers.constants.AddressZero,
      '0x144d196Bf99a4EcA33aFE036Da577d7D66583DB6',
      '0xAFFF04FbFe54Cc985E25493A8F9D7114012D6d6F'
    ].includes(owner)) {
      // console.log('got here')
      continue
    }
    if (count > 200) {
      addOwnersBatch = []
      addOwners.push(addOwnersBatch)
      count = 0
    }
    count++
    // console.log(owner, items)
    const ids = []
    const values = []
    for (const [id, value] of items.entries()) {
      // console.log(typeof id, id)
      ids.push(itemMapping.get(id))
      values.push(value)
    }
    const addOwner = {
      owner: owner,
      ids: ids,
      values: values
    }
    addOwnersBatch.push(addOwner)
  }

  console.log(JSON.stringify(addOwners, null, 2))
  let totalOwners = 0
  for (const batch of addOwners) {
    totalOwners += batch.length
  }
  console.log(totalOwners)
  console.log(addOwners.length)

  // let count = 0
  // for (const ownerAddress of ownerAddresses) {
  //   console.log('Count: ', count)
  //   count++
  //   const balanceItems = await vouchersContract.balanceOfAll(ownerAddress)
  //   const ownerItems = owners.get(ownerAddress)
  //   for (let itemId = 0; itemId < balanceItems.length; itemId++) {
  //     const id = itemId.toString()
  //     let ownerItemBalance = ownerItems.get(id)
  //     if (ownerItemBalance === undefined) {
  //       ownerItemBalance = ethers.BigNumber.from('0')
  //     }
  //     console.log(ownerAddress, id, balanceItems[id].toString(), ownerItemBalance.toString())
  //     if (!balanceItems[id].eq(ownerItemBalance)) {
  //       console.log('missmatch')
  //       throw Error('mismatch')
  //     }
  //   }
  // }

  console.log(ownerAddresses.size)
  console.log(owners.size)

  // console.log(owners)
  // console.log(owners.size)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
