async function main () {
    const diamondAddress = 'diamond address on mainnet'

    let aAgents= []
    let itemIds= [55,56,57,58,59]
    let quantities= [1,1,1,1,1]

  
    const dao = await ethers.getContractAt('DAOFacet', diamondAddress)

    var i;

    for(i=0; i<aAgents.length;i++){
    const sendaAgents= await dao.mintItems(aAgents[i],itemIds,quantities)
    const receipt = await sendRewards.wait()
    if (!receipt.status) {
        throw Error(`Not Sent: ${sendaAgents.hash}`)
      }
      console.log('Minted and sent at', sendaAgents.hash)
    }}
    
    // We recommend this pattern to be able to use async/await everywhere
    // and properly handle errors.
    main()
      .then(() => process.exit(0))
      .catch(error => {
        console.error(error)
        process.exit(1)
      })