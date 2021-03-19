async function main () {
    const diamondAddress = '0x71A023b48752Ece02C05dffFBF5Ffe914AD490fE'

    let addressTest= ['0x8cAFB4d6ff14E0Cb2999e25C6f63E5BdC4865428','0x11d4620D850e1E152fE82Ef90C26268b1a78Aa40']
    let itemIds= [55,56,57,58,59]
    let quantities= [1,1,1,1,1]

  
    const dao = await ethers.getContractAt('DAOFacet', diamondAddress)

    var i;

    for(i=0; i<addressTest.length;i++){
    const sendRewards= await dao.mintItems(addressTest[i],itemIds,quantities)
    const receipt = await sendRewards.wait()
    if (!receipt.status) {
        throw Error(`Not Sent: ${sendRewards.hash}`)
      }
      console.log('Minted at', sendRewards.hash)
    }}
    
    // We recommend this pattern to be able to use async/await everywhere
    // and properly handle errors.
    main()
      .then(() => process.exit(0))
      .catch(error => {
        console.error(error)
        process.exit(1)
      })