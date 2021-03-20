async function main () {
    const diamondAddress = 'diamond address here'

    let aAgents= ['0x5e31c357d03e9528e9bf95bd16e5c1ab3f7d37d0',
    '0x2c123fc5c27888571cd525e8ae9b0c5ff848386d',
    '0x804f9e7c491a24e305586a0cd6a02513bf3b155f',
    '0x092fd700a49391146544dcfbcc55b0d02cc06283',
    '0x2f1fadc9aae4f2c0be2320ff701a787baf644432',
    '0x68e426f2a9f5a418daed439204d897a729c7aeda',
    '0x29746c9d6b317c6df26ac1751d6cb03a55c1b8d5',
    '0x219688c6156edea2e2ca7e2036c1c5b7f6451169',
    '0x80039dc3d5bb48ec4bd822c4e8828574fdcc51a6',
    '0x173a0131a3395843727cb654e5b5d6ae9c0c2588',
    '0x40a628d16be2ba6956f60402b17f52e8bfe32497',
    '0xfb5a2da7c365bfdd817bcc29a49c97b80e450f3d',
    '0x2848b9f2d4faebaa4838c41071684c70688b455d',
    '0xbb5f1370ec7bd5925cba7754910ca4b448d3c014',
    '0x5f1f32fc64c1fd7c01d7b2d585638525e5c71bcc',
    '0xf7b10d603907658f690da534e9b7dbc4dab3e2d6',
    '0x302b9dfc92da56a19477c891a7b95cb7e32a5a69',
    '0x4c39185a078b5666c372538231cb793a0928807b',
    '0x885f12b525218ca9377755f9a534ce230ac5d2d8',
    '0x9fb3847872b3694139d4c19ffffb914520e926aa',
    '0xfacef700458d4fc9746f7f3e0d37b462711ff09e',
    '0x8b2f579c4670f4e2feae28efa920afa4eb32d76a',
    '0xf930b0a0500d8f53b2e7efa4f7bcb5cc0c71067e',
    '0x808a023b72260170c95d831f589a1ae0dca1e43e',
    '0xd582737cebebf8f683e2d805dc81f08669e159a6',
    '0xe91cbc483a8fda6bc377ad8b8c717f386a93d349',
    '0x43ba164b30461d211cca68ac67c8b0f358a6f695',
    '0x10d2ed17408a508bc1693d1fb7f3b9899a96cc98',
    '0x4ef1a210a74fdfd9cc7507924e918b0f5c392b24',
    '0x9257010255b86942ffee4118c1ced5276d1b47e9',
    '0x6b0abf7fcaa10ebad592409d931571306b875cf4',
    '0x5887c247f6fd0831e1bdade8dde235b371cb23ac',
    '0x0236c75860d07e8d5add17c88b9dac04472c2295',
    '0x83bb781a2a2ca1fec0350f178c911848811cc440',
    '0x4d91838268f6d6d4e590e8fd2a001cd91c32e7a4',
    '0xd92693c39d3231b96379b636c3bbc9bb73969343',
    '0x82991643951f448b7efb9b0b05f48baa68eb1add',
    '0x47c932e74d1bcc4614707640d4abdcf4ac88572b',
    '0xf305f90b19cf66fc2d038f92a26440b66cf858f6',
    '0xf09d1acbf092ec47970a2aa9e16bc658b2ecf15e',
    '0x94be7dea60d78d5410bcdc3182afd948a38f85fe',
    '0x4a4ed80265fe80154259b01051f27667e46d0262',
    '0x8a20ecc5dcf7cfdcadd9969c66366ec958317fb5',
    '0xfa46dedf812c5803b1e2cea10eef3f27dafeca56',
    '0x0b9439d58274578ee2e011a09f2e110134ce914e',
    '0x09a1a849974d021a0f74366e5020884ff73e3abb',
    '0x7904adb48351af7b835cb061316795d5226b7f1a',
    '0xf69ea6646cf682262e84cd7c67133eac59cef07b',
    '0x81397dbe05e0df839f16d9c52869f70a69f00bdf',
    '0x86d09d173fb28f30b5e2176fc1b7a2b624a33629',
    '0xd4d8564baace86315f02e91d1afd54a5979719e3',
    '0x279322ca10987bb236902dbddb85e9e676cf7a0d',
    '0x4e483558e4e59416eea246f643d78470a7d6d5a9',
    '0x8e59f1fe1c8d828dda49971ab96e6a003a7e2f81',
    '0x5e0158553598b40ecc13a3b1f78ee96536e6d0da',
    '0x609949ccf906303cfd4f2a8365cc78a987284fc7',
    '0x70c1eb7731ace8019437f2d0c2201a57d18a7178',
    '0x2421134c8e8278ad199f6886ae70c5c373da3b48',
    '0x85c7199b5a36e87956cca466233de6710e849d6d',
    '0xa4dc2788bcc832095bba2b148a5d98d0dca270a6',
    '0xc9c0060b67244ef955b050eda9de35610b94a0f1',
    '0x987fb317888cf344da7fc3836bcf62a9f6718858',
    '0x11a661deee632244ebdd936b1784f4fd1cbbe364',
    '0xceec48581b3145a575508719f45da07dc57fa7ce',
    '0xf2c06f90fb58844c09220e01e3116a2293df6960',
    '0x76e059c6ff6bf9fffd5f33afdf4ab2fd511c9df4',
    '0x01cbca310c9f65d8877bddf0a70f57e5de294fde',
    '0x02a0f1a59940dddb35a38327e93d7abb49e285b1',
    '0xc68bba423525576c7684e7ea25e7d5f079b1361e',
    '0x5b3d22cf16963eb57fea96482728d91e885cb71e',
    '0x18e6c263ecd40ad31d9079b20730f04a59dd73b0',
    '0xf4f56fa0d045ae0e6ba8f82e2c32887fe0b152ea',
    '0xcef64ac8f0b66a75e799b52df041b637841475c5',
    '0x3f60a58dbaafc585bbcd2ab7b3b20e1fa3ff4d93',
    '0x51c18217fd5cd24bff32f272eff9f2cac6a0dd32',
    '0x16280c48c95a2a4b04cc8a03bc52ede22aa193da',
    '0x2ba117929c3c53ac7c38ad870321573c740cf139',
    '0x2c96108ab531c96989110c2a7506a4b0b68ae2a4',
    '0x67922a9561423548a9ccfd67ad80d6c637c26bfe',
    '0xa00a0249268d8dd052d9a5207c9b229312f26bcc',
    '0xa1cb4468f529f51296180d148f4764adde8563a3',
    '0x00c67d9d6d3d13b42a87424e145826c467cccd84',
    '0x67023130eaab2969e26e5a25e2abf901c01bcda0',
    '0x9b11b6d5eaf7dcc3dc2d65067e585ac814a0e29c',
    '0x46340b20830761efd32832a74d7169b29feb9758',
    '0xafd5ec1a5fe09e6597de92c34a423d7c35864023',
    '0xb3b4dc3fc2a1726dbc982ac170463418695ac649',
    '0xe6ec7ef520b4b3b479b9ac58893acc778ba94780',
    '0x75a49cc7d1e39f2c743dcbbd462189f4d15f9cab',
    '0x61c90c2139b75d777ef4c0482bf166bb3cfaa8dd',
    '0xaa4404929742c719e3874eb68a52315fcc48e246',
    '0x5e611e445b62ee4ece67b58996d64ab9942cbad3',
    '0x22e294835923149e9e3bbf2417794d0a3c01eebf',
    '0x48b211039586619b04cfb3b040cdd12165e3a9cf',
    '0xf113a8031d4c17d0d42557db49d36072ad8943f7',
    '0xb0c4cc1aa998df91d2c27ce06641261707a8c9c3',
    '0x03f2e1a326ef98ba1ed8e9670daf853e3e8c1ee1',
    '0x69fd6f4ff4e0da5149355ab5151f4c5962a6b77c',
    '0xab6f255dac71103ea6d57b320eaf0eec901b05aa',
    '0xc1fe4b79b00221cbcba7c98b94ccb2e1cc5cd42b',
    '0x23abad8c65a9a93abcc343892aaf3d6e88b5ccc9',
    '0xe8ee1941e305adcb76b5c63db37b9880e48deaaa',
    '0xfeac872a93df8939df3face650945fbf3ea705e9',
    '0x982ad1aed87c4adf0de68939266c2cfe302567b9',
    '0x1cb9edf191a4f59188a02c78b5e52fccc3437ac0',
    '0x969de568df4cec02e682acf75d7ed9f048de3aba',
    '0x1f00caf73bd622c8c82512ff21a7bea327a2f0ad',
    '0x808378793aaeab39ae4cd93aa6a5b78fc29423ca',
    '0x38a5ab0421b1df2e9c3b5dd6aa47fd0ac620c142',
    '0x23230789629cde13f28ed45f3540a5d008d59db3',
    '0xfb484b529fa4d54a90ac73c98b357dffd833c052',
    '0xc561c9b7035732b4ebdbae6ac43d6a293ab53896',
    '0x26e8d063196fe2c8f276bf8d3cfa0ab188f2f086',
    '0x7141905e9aff9c4b430a9d925057f1256a45eb1a',
    '0x8f3c5a816de6704782e081ccb5ded6080be83cdf',
    '0x477dcf169ff73bec8c71839d886b00a944f6f384',
    '0x0be0f09adc19334286027ed281b612a49893cd9a',
    '0xbbd17e0d4066b9ea8e662485b87cc6f0f6c25485',
    '0x3cefb7c50fb12c4c4b42bae9632dc29b9ea660dc',
    '0xaf061e0906a4f6f696134a9ebe19b54d4ae04c02',
    '0x6ebd5957ef643885869322352d02205c1c654e4a',
    '0xf9f050710638926bd225d829b5b1838b4dfcf8d6',
    '0x816fdd4391f0c27a3004a06551df7b8204a2ed2b',
    '0x32fe1742fb6a3c47ab48ec9295de2c982e5ed1f4',
    '0x43c558133b497ec0d94a7beaf3271305fe00352b',
    '0xb5509bb998482d71e3b38ea884a8abfcb1d9663f',
    '0xcec368a37182d3c8fedd7b7abf112df16bb46e4b',
    '0x27cc0eca81250e0bc4a2d81d276240e3b0d23c1f',
    '0x4cf294cb8d8f73d0d5281c3ff6d876c267b95c1c',
    '0xfd8d06740291e7f2675bc584fc6021d488b37c4f',
    '0x00b73697688bbb4ceec57c1271fe4a772029a511',
    '0xffcd4e54ada433f28acdd933c39bf80c5e2be5d9',
    '0xbd6f5bdc401ab1ca811e40755f4a2ddad75ce2cc',
    '0x35ebf9baf1bb4e74fb2769a3fc93e431457c4d40',
    '0x0b946efae53975b97a0d1d02f75fabf55d0d6a96',
    '0x146871e678ac017bda868d149807deb4247b77cd',
    '0xab48070ea1375f90e80b1f26b2fbb9520da62dc5',
    '0xab751c7c5e7f35a9db689a5df4761eab37aff21b',
    '0x8366725944fde1fecb61892dfb80ae27a1a85203',
    '0x8531b062b2512ab6784c7b4a8dd53fae60d7bfc6',
    '0xe1f987cb66d8f0da79cb0fe245500200bbfba51e',
    '0x99f900f51808972921c0749efa3cb343847572a6',
    '0x5177b16c99590d9085d34cdd23d4633754a126a9',
    '0x48dbb9b7b562acf3c38e53deaff4686e24c3d85d',
    '0x077777f53544c2b2ef753c19e8fc048049c5ff95',
    '0xd33284930474fd9cd8b09735026eb1613c8a80a6',
    '0x3e099af007cab8233d44782d8e6fe80fecdc321e',
    '0x977a232693190d28fdc95478804a5f3fc42b1db4',
    '0xcddccc9976f7fd5658ac82aa8b12baaf334d27f6',
    '0x26921a182cf9d6f33730d7f37e1a86fd430863af',
    '0x459e9e7fa2631ce07a8369beeaebce0a660b9ecc',
    '0xd1468a5e1ff399d7a4465fbdff3e3ccb013d149f',
    '0xbb403d793dda52f8512950953771b7c341086120',
    '0x76c5c0fe97dc92299d80676043bf12df29366b6e',
    '0xddf86597aff5c826643bced8ef0b84b10a2847ab',
    '0xbc6bccedd927bc51c128c9355da735869a5dc280',
    '0x03a83b8f6fdba66bf9618fa7a9d99f2706777c3c',
    '0xae7a80f85738dcfa82a88f341f5484d2006c549d',
    '0x59af3fe14cb38e6ff055599de90988411e340a65',
    '0x9b81fcdb243ff7137afcb77209d1d4be9dc3a6b2',
    '0x0652b88b423d432c8eb02a7416247fd10d567286',
    '0x0b81747f504dfc906a215e301d8b8ad82e44cbd2',
    '0xcffe29912ecd2d4b1619745cf61135db7a3d10fd',
    '0x4453820d0774568932bda73ca3f6abaf1d47a0fc',
    '0xed922ec0f0b7512ab0b20d366f18313ace7e3aa1',
    '0x83668385e58ba0bc5faf426e92e18b4a5b08bc55',
    '0x9bbf4eb71309481bf24fad510911538dfd398483',
    '0xeb69997aa92fd0c7eae84df1fed6e005a8fb8762',
    '0x740b0dd14cacc0e95b370f65408bd571dae2e3cf',
    '0x675abe8ee72d38c4eb6d09ce837ef4cce5e9b33a',
    '0xfb40c7772074c3b54f06e8af8d492030aa90b4e6',
    '0x244fe02fbcf4db4ad96063b161f00e444fc54011',
    '0x75d5ced39b418d5e25f4a05db87fcc8bceed7e66',
    '0x056f2f34ae9f48c1622eab9cf12a0b156e34acc1',
    '0x13461bf1d07c431ceda36539db5a6b45d90b05b9',
    '0x4d069fd1e96d5ff890be0e00a801ae0afcb4dafb',
    '0xe81bb5869317160159f2b9e108583e651170d23e',
    '0xe96d65ec7c8856114878300697a3e5052de194ff',
    '0x5c9f8679cc697fa7102ba54f7a5a5254bf622020',
    '0xce9332f4d44e9efccc64f88c9bd23e288c0ae5a2',
    '0x6df30dca70376116e57cfdd3a2b51b046df22716',
    '0x4ada1b9d9fe28abd9585f58cfeed2169a39e1c6b',
    '0xa9c3708cf41b3779a7b6979d96cd3624ec66214c',
    '0x0e3347baed6e6070097c978247ead2f716c4b7a0',
    '0xc15792b8578fc26c10de7f88191ecff579151866',
    '0x4f672b005e0813f3f5df81a09ec9ab99919d6075',
    '0x5b204486861346927d5fac3a362493d9a44bb07f',
    '0xb4845049cf818dccd320eb715c1a475b0cffa1c3',
    '0xed2a5358671df71f6120d3b4f758aebd3c20108c',
    '0x7c734f58dc0892d3ad4e4a8804c169a3fecb2120',
    '0xeeb6914c57431abddbba04ec2571ffb95f86387d',
    '0x27e605f832be6f3951d95384bb05245ee30f8796',
    '0xc4f1e3020e1b07b66afbbbee30f50383f46d7091',
    '0xe2d128323cf7560a6e7a82726d7b425aedc7a556',
    '0xa4a4d61f63d909421679738f0262b52534dfc467',
    '0xc3de23dc565df629f1422f7db0e5504d21f4fd65',
    '0x12ef2cd4231d5cf655a6cdd4ac1524ffaa439c17',
    '0x6bac48867bc94ff20b4c62b21d484a44d04d342c',
    '0xbdba5841f7c9c87dbc3cda478a69617a9fb2eaff',
    '0xa9ad1837e342cb8df31ab36764e21470bdd0c4d6',
    '0x9af906c01f75154dd3402dfa441c7a4251c3201f',
    '0x79bf225fbfd40f78b1878a6d1eec1bb03df92aeb',
    '0x5000e435c595b63c097fc3813900147e4c72b87e',
    '0x3c803a58e42d5e78475b185dc9b055df16e86c6e',
    '0xc2e4af5c3e72d44be02ef922823d43f96790bbd6',
    '0x9c3bacade6bbe81a6238110a28628512abf4ec4a',
    '0x9b1f13eddba3c852d6c38bb23441ef4962d18040',
    '0x6777529d538c57d6cc6d46da4610758245470dab',
    '0xc229d7d3dd662a1b107e29aa84bb0c8ff609cf3a',
    '0x8a1cd4165dbbf480d11c4e2418c621bd2fac0f06',
    '0xfd9b482ee7256732a003e7c6747c53d832101f26',
    '0x6cfe9755269786f6681518c00bd22801f98f9e57',
    '0x7446e900a37726ee67b02e6f052dcaf875cc7832',
    '0x7e4724c60718a9f87ce51bcf8812bf90d0b7b9db',
    '0xd8f35ef085d202fa7cad0e0c61da737b60e1f855',
    '0x13fb97da9d2407da6dbc2d6c175b51d0f5d9d903',
    '0xf207defc445438b122863d881421f81cf44c47a2',
    '0x38daea6f17e4308b0da9647db9ca6d84a3a7e195',
    '0x857f58b6afde4bcbe9b86409242c146f0d0de31c',
    '0x427222582af199752e22c973d1d194c82e02084f',
    '0x514b1861561fddf86baf8462e001a1584e1b7b83',
    '0xe61121dd5692c97f02504d2c01be88339a7a73c9',
    '0x0c404f55595ab844d519a084ff1b8cb36aaad1d1',
    '0x4e1acbb9fd16bf427ad02ace5e603b9912289d13',
    '0x0d3763b6667d17cf52b6daea46acd165ffcb5189',
    '0x6fb4becf05497b79f0fcf61cfa5075efaa137ddf',
    '0x42afe93a50c9fba4bf55de264da7bfacdbd2ec70',
    '0x243cebb2fccae390639f2b454e4886dcfae7deee',
    '0x8fdeffaf8fa2b3754da2268e626ea1f3733ee214',
    '0x9fbc65a78e12c66d6dd014f85ce742acba1da45d',
    '0x95a26811f45b2b7f442d23c4a6560473598af9c4',
    '0x2fd0476478c01d0472b264e27f9d3c1b30dada2a',
    '0xd0dd4e9ec4025228cf3be5f0459640b485e4b8a2',
    '0x36f1143673ea7a06dcc0ec64625ddd0e094e964f',
    '0x0b6bf854cb7c816518a96317893e43ab219bd365',
    '0xd422515ed7e0f3f5c323b9b44bcd625116f0c1b3',
    '0xdbb9d557191501fd2cadf5a9fd80845f162d20dd',
    '0x2c2add1c863551a0644876be227604c8e458dd7e',
    '0x4ac006ecc51ff15054a0cc21d715f80cfa8d4341',
    '0x57a9758a076b4f2733f1dfc1488756228b9c6452',
    '0x716342594dd0c6dd2efdd719153696c67760f461',
    '0x7aa37e107a71b077cdb586af1e2fb38be3911aca',
    '0x35f64560c51c8772f75186a8931929589b7c8d80',
    '0x8e63e4376dde62cb82f5a91c4bce4156457dedb1',
    '0x4d1dcf15acbc0b69aed7b0d87bda5cbc66c48184',
    '0xb2c980a75f76c664b00b18647bbad08e3df0460d',
    '0x7c8263e38a6c0168015169a6b6f86eef1f271d71',
    '0xdf14100b76a5b5fd46fba22b7ac124919cffc92a',
    '0x557badbc8c772d3ff055c905181759c8c82abc34',
    '0xba181deb98afc2202202c9aebf26b18f46d70497',
    '0xda179069e1800c1420a3c82ca92dd04c5a0d017c',
    '0x6dc899ae3c70f0a70deacb59a3a109608e24a6a1',
    '0xdda652dabdd7c9a50cc1fe389b6ae93570539b82',
    '0x61226c038c7ba1179f1670715098d945f6196edf',
    '0x793a68e64214a1c4a0406a214874b60781320596',
    '0x22021bb4404a637cc82cbff53bd30f9c16083095',
    '0x8a3708558a1ab29de8b3389a6ade86433c220c39',
    '0xc1dc5f788bc1d1f520f1f757664605d43df65783',
    '0x15c3b2839747d6785949808ba71d4b2863b33732',
    '0x15e0d39eee48ae0beb8047b732d40fd97f8a473c',
    '0x90e0e71ba8604804b965447b2ab96d5235af589f',
    '0x330e896c9fe88e69bc924938ed600488c3a7c004',
    '0x9b8afaf4ddcf5097743e99843afdb90e4bc64f6f',
    '0x7c6af3db17eb1a3c642149143f55d119223786f2',
    '0x4d72a61647afdecd607df768f08e0bdbf4abc85a',
    '0x94ff9c0e21c5df1103c0c79da4f4feca509f6053',
    '0xb55532705aeaa758e000159c8d8277e247fe7133',
    '0xfc19a39cf6649a1d6be697e4701e609eadb75e23',
    '0x5e1eedbb241689fb7f713328be027c98b5c789db',
    '0x095e36045e17c7be83a5187c1e16a1b3539ee517',
    '0x4f2013ea1f91108aa422777fea124b9fac6ca019',
    '0x2ce191174caf5d17f2883b45928337a0e2cc554a',
    '0xdc52a40b0298a9b52dce7d94e962242fab6280c8',
    '0x37ffa82ba3ff70e45b7bfe2b8b357cb6be5998c9',
    '0xec88b89704203a345c8d1bd090a3eb9720508573',
    '0xbf15754dc61f5e552a5c5a51e6b571d567798650',
    '0xe7b6be706a2042e0cd56eabc0d160d2496a0ec2c',
    '0xe5a71ec37b87b0283e4c7191e5e0d9f2369c2a65',
    '0x12953c2b0d0ad6ad94e1e691b332245febfbf8c9',
    '0x65e7e077911ae11811a7d2a49bc8a657721da685',
    '0xeb85a4ffa6a194bcde4befd2eecabd4f65c3f8c4',
    '0xbceaa1b2e31e7f5307b2d1f546a51b3e84065584',
    '0x05a6cac0b7e4b030c2cbbbca93f72e3b203acf06',
    '0xbe09de9f8caee25c422459c1e13d6caed78683fd',
    '0x6559642b49d6709f1401aa8c89c1aa6f01912cd0',
    '0x743d92f10585212f457ec882a5443b06bfbad3f9',
    '0x0847f42f790b663b2069e890d15458ac0004e44d',
    '0x65f9deacd2eb34ea0e86be918f922ed5fcab75a0',
    '0x3477823dc687e24147494b910b367cc85298df8c',
    '0xd24a5b3a49ec2ed0dace25f1debed07e340befc9',
    '0x0b31e9737fee75157a9aa775e35a43dec1dc2059',
    '0x48dfb36397fbe6de0a7af43809f14f65478f4dcd',
    '0x298f9eaf0ed557c0cbe4b7a53fac0644171c3fc9',
    '0x0ecf666964a53be81b6948af19a849d223b5e11d',
    '0x696306ec420f46a5a6c90aa989cf3d868f9bc5ea',
    '0x0d2d910fb7297517c0b33960ade8dee999d865a9',
    '0xbc97878b63c81b949be7773193fa22b4ac763779',
    '0x12680bf436b8166d5f045c5213f074a8567ed462',
    '0xfe334375f611148d6da06bc56a0283d911396cde',
    '0x2c05168143bed5bb3fc81519d9e092aa7acf514b',
    '0x5ab3d397954cf1ecef05289c0c6ee95795cf472f',
    '0xb4732e55a5d1d6224f5782ed55035cd75d8eb066',
    '0x7225b90d6d522013ed3cea50bc2e460e8127f0e7',
    '0x90d042b60d1b1a42c644e1bc8a09c480bd30535d',
    '0x539c2ae85dc095741779e911f4daea06fa283f93',
    '0x4ae47f5ab408237cf234101e91775a46ee751723',
    '0x198bc4fc7336dca13bedc13923802708ab0563bc',
    '0xd42c3b92720d34d339349e3390a99a42f947b0a4',
    '0x6edb3471d4e0a90a785d3fb8ebb81fe32c6c25df',
    '0x3097446d4913e7df060ae6ff66adc8b0d82383ad',
    '0xda6f875332004ed76f7e318af503d717dedb9ca5',
    '0x599bd422dee6bfc0435109518f6211c75229db68',
    '0x415c0d1619f14b8e9649cea35afdd9ca69f018b4',
    '0xf15b71bc38968b45803a2c00a1af083c42353c6e',
    '0xdab8a6f9a71a6a57c5df60e807899eb9cb6409c8',
    '0xdbaab506e2126ac3bcb1381ef8e1146d88b2eca0',
    '0x31895a4ae6fbab6daffe7097a1d8321ff927b491',
    '0xa2c05b1b47a7bee17bd5ea22475592b60dc55851',
    '0x4355b8757ce14e87a73cbc3813fcebf15d46c11d',
    '0x5001b28569f30444b8b69195f8725531e1bc1590',
    '0xef7621a0e6ea1a3ad8c321a86a8378f0868f9919',
    '0x9f2bb41b5ad874292b8f2a6dbdf73fc1c255ca32',
    '0x2ffcb2211d4e6ad9052ab24e7865576619bd1c1a',
    '0x7465385882c1f77e5da14eb26350c34fd276b0f4',
    '0xf629ede7b7a6752edebb6a5b43603328eb9c53d6',
    '0x90933c23a154e987b21e155e2856ad2554dbec7a',
    '0xf72b7b647f9d8a28e72dd9308130c9cdd57e65ab',
    '0xfe02104ff4fe36e775d3b04619cc965470e33e1c',
    '0x20ee31efb8e96d346ceb065b993494d136368e96',
    '0x3a7ed7efc38a41a31b514779dac77ec8603cea1e',
    '0xda5b2cd0d0bb26e79fb3210233ddabdb7de131c9',
    '0xebd54fd116d961c3bb9fb0999c1223066aabae6c',
    '0xc96457a7932b1aa9abcb9cedf1ec96ec164aa265',
    '0xa0e05e700dbdaa7a02802f1df37bb593851c7297',
    '0x7381f410298ab845bfdf44b12f66db89949850e8',
    '0x985116f8c174fe13325d36685424d1796cc11f51',
    '0x842702f9edaefafbcf5c134f84492428d97d720b',
    '0x415ede5736240f4d97d3df8b813c88e782dc85f6',
    '0x1e9fb5428855064b5c38e3ae96cc9878c573ed53',
    '0x47a5c1117e70fdd91719beaef249badd16f08d55',
    '0x5304a4b2beb71d0812cb911426ec9b8573227e2d',
    '0xe1ff19610020d72930aee1b9c047e35b7fd0080e',
    '0x3bf6b896f2362214764120bdc6044e5b9fb4a048',
    '0xef4396d9ff8107086d215a1c9f8866c54795d7c7',
    '0x967e830b7148a15e27f944230c7166578d1a3e23',
    '0x0d020946d44dd3ee54049c1d0164c2cecac1fab6',
    '0xc7ca46dcc1ddaad78081b12f64bd61d9f0f2f22d',
    '0xfb7fae9a9581dbf747173b78ab9ebb1954273fe5',
    '0xbace7236e11bbe78877518957018c817e5cd0a09',
    '0xeda29227543b2bc0d8e4a5220ef0a34868033a2d',
    '0x780432eabda6f7db5742149d3915605f9049fe3f',
    '0x8c3a67c709062d6c0144641216aba5a27d620a98',
    '0x9c6b3261282fc36c9b6efae89717f4c1f9883234',
    '0x9563e1e3335c07a5ae5343db70f2cd5cb2c5d45d',
    '0x78007a534a732de370b64d29ff9ab4cb52bff29f',
    '0x8e662143178bb8c797620a3a61f34a71832475b0',
    '0x735506da15b78701268f66dbf6c3e8d4058097bf',
    '0xaa126ec5d4b0c1ae94dfb0d7176ce785af7d02ce',
    '0x0beb7069c28011a20bcab0f97db593a3832e8e4b',
    '0x4a53133cc77f32b01b36211f3020fdae0e484987',
    '0x795f50722cf5ad82f78dda8dc8f7b235332977c3',
    '0xab4787b17bfb2004c4b074ea64871dfa238bd50c',
    '0x8e8765611638670812e34408fd464ae3a354171c',
    '0x2ddcedabf0e6c8957802772c4e1a8f3a6da2da5f',
    '0x216708e091cf9aa1767942173deec5607eb31358',
    '0xb16f5266023ec74f8df627ed09985b38c82b5ae8',
    '0xd69ae924914b9d5e8a8105e5806fd2023f67a7db',
    '0x20ec02894d748c59c01b6bf08fe283d7bb75a5d2',
    '0x3c6d73475d8a64cec5b5170853ab38ccf51eb130',
    '0xae6a6df7ff0e51be0eee0d85f0ac2c3a165f14b2',
    '0xcf24946b78d90ce51d7a5b279285ee15f9dfb621',
    '0x62ae26eed77bdc7a0e97b13b2ed62170096b8e64',
    '0x77f41d8a529fc1f77bf32992c9d98ca666bb053f',
    '0x0454365ced5a34ad7bff680f5cb3958aff984554',
    '0x8205bc61237f65864d87ad1aa962478b93a8bd12',
    '0x9e531b74aa95127ffd77143392a707f4145d1345',
    '0x9b35dbc596f545739e25e203b41823251acdee17',
    '0x359e9bf89e77f0fef31e792e9b398679981ccd6a',
    '0xce6619d059928890cfec3200547c0d9f983e7c81',
    '0x34fece12d57271cf7be3f8056a2804d5e8339221',
    '0xab4f4524797f0215f653f90c538ce5de20888245',
    '0x5cc6fa3008f70e98ab3ac52da49995ca79e51466',
    '0xc95c5d2c19f1117100d8c78840924fe68c8e6071',
    '0x02aee0ce756fa0157294ff3ff48c1dd02adccf04',
    '0x8bd73fd815bc1270b2e0ebfd404614709af1220f',
    '0x9d60bd851a86c5b423353b6383c944be90837daa',
    '0xa35b52835dc644444881dd51563d13ad987c148c',
    '0xc0719b1040f7f8e904a6509f99335656c1d881ed',
    '0x8ea8721f27efcaabb3901ed6756505ab873f15a7']
    let itemIds= [55,56,57,58,59]
    let quantities= [1,1,1,1,1]

  
    const dao = await ethers.getContractAt('DAOFacet', diamondAddress)

    var i;

    for(i=0; i<aAgents.length;i++){
    const sendaAgents= await dao.mintItems(aAgents[i],itemIds,quantities)
    const receipt = await sendaAgents.wait()
    if (!receipt.status) {
        throw Error(`Not Sent: ${sendaAgents.hash}`)
      }
      console.log('Minted and sent to', aAgents[i], 'at txn' ,sendaAgents.hash , i)
    }}
    
    // We recommend this pattern to be able to use async/await everywhere
    // and properly handle errors.
    main()
      .then(() => process.exit(0))
      .catch(error => {
        console.error(error)
        process.exit(1)
      })