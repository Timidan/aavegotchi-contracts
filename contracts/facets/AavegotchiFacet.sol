// SPDX-License-Identifier: MIT
pragma solidity 0.7.1;
pragma experimental ABIEncoderV2;

import "../libraries/Aavegotchi/AppStorage.sol";
import "../interfaces/IERC20.sol";
import "../libraries/Aavegotchi/LibSVG.sol";
import "../libraries/LibDiamond.sol";

/// @dev Note: the ERC-165 identifier for this interface is 0x150b7a02.
interface ERC721TokenReceiver {
    /// @notice Handle the receipt of an NFT
    /// @dev The ERC721 smart contract calls this function on the recipient
    ///  after a `transfer`. This function MAY throw to revert and reject the
    ///  transfer. Return of other than the magic value MUST result in the
    ///  transaction being reverted.
    ///  Note: the contract address is always the message sender.
    /// @param _operator The address which called `safeTransferFrom` function
    /// @param _from The address which previously owned the token
    /// @param _tokenId The NFT identifier which is being transferred
    /// @param _data Additional data with no specified format
    /// @return `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`
    ///  unless throwing
    function onERC721Received(
        address _operator,
        address _from,
        uint256 _tokenId,
        bytes calldata _data
    ) external returns (bytes4);
}

contract AavegotchiFacet {
    AppStorage internal s;
    bytes4 private constant ERC721_RECEIVED = 0x150b7a02;

    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event TransferSingle(address indexed _operator, address indexed _from, address indexed _to, uint256 _id, uint256 _value);

    /// @dev This emits when the approved address for an NFT is changed or
    ///  reaffirmed. The zero address indicates there is no approved address.
    ///  When a Transfer event emits, this also indicates that the approved
    ///  address for that NFT (if any) is reset to none.
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);

    /// @dev This emits when an operator is enabled or disabled for an owner.
    ///  The operator can manage all NFTs of the owner.
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);

    function addCollateral(address _collateral) external {
        LibDiamond.enforceIsContractOwner();
        s.collaterals.push(_collateral);
        s.collateralIndexes[_collateral] = s.collaterals.length;
    }

    function removeCollateral(address _collateral) external {
        uint256 index = s.collateralIndexes[_collateral];
        require(index > 0, "Aavegotchi: _collateral does not exist");
        index--;
        uint256 lastIndex = s.collaterals.length - 1;
        if (index != lastIndex) {
            address lastCollateral = s.collaterals[lastIndex];
            s.collaterals[index] = lastCollateral;
            s.collateralIndexes[lastCollateral] = index + 1;
        }
        s.collaterals.pop();
        delete s.collateralIndexes[_collateral];
    }

    function collaterals() external view returns (address[] memory collaterals_) {
        collaterals_ = s.collaterals;
    }

    function aavegotchiNameAvailable(string memory _name) external view returns (bool available_) {
        available_ = s.aavegotchiNamesUsed[_name];
    }

    function setAavegotchiName(uint256 _tokenId, string memory _name) external {
        require(bytes(_name).length > 0, "AavegotchiFacet: _name can't be empty");
        require(bytes(_name).length < 26, "AavegotchiFacet: _name can't be greater than 25 characters");
        require(s.aavegotchiNamesUsed[_name] == false, "AavegotchiFacet: Aavegotchi name used already");
        require(msg.sender == s.aavegotchis[_tokenId].owner, "AavegotchiFacet: Only aavegotchi owner can set the name");
        string memory existingName = s.aavegotchis[_tokenId].name;
        // require(bytes(s.aavegotchis[_tokenId].name).length == 0, "AavegotchiFacet: Aavegotchi name already set");
        if (bytes(existingName).length > 0) {
            delete s.aavegotchiNamesUsed[existingName];
        }
        s.aavegotchiNamesUsed[_name] = true;
        s.aavegotchis[_tokenId].name = _name;
    }

    function buyPortals(uint256 _ghst) external {
        require(_ghst >= 100e18, "AavegotchiNFT: Not enough GHST to buy portal");
        for (uint256 i; i < _ghst / 100e18; i++) {
            uint256 tokenId = s.totalSupply++;
            uint32 ownerIndex = uint32(s.aavegotchiOwnerEnumeration[msg.sender].length);
            s.aavegotchiOwnerEnumeration[msg.sender].push(tokenId);
            s.aavegotchis[tokenId].owner = msg.sender;
            s.aavegotchis[tokenId].ownerEnumerationIndex = ownerIndex;
            emit Transfer(address(0), msg.sender, tokenId);
            emit TransferSingle(msg.sender, address(0), msg.sender, tokenId, 1);
        }
        uint256 amount = _ghst - (_ghst % 100e18);
        uint256 burnAmount = amount / 10;
        IERC20(s.ghstContract).transferFrom(msg.sender, address(0), burnAmount);
        IERC20(s.ghstContract).transferFrom(msg.sender, address(this), amount - burnAmount);
    }

    function openPortal(uint256 _tokenId) external {
        require(s.aavegotchis[_tokenId].status == 0, "AavegotchiFacet: Portal is not closed");
        require(msg.sender == s.aavegotchis[_tokenId].owner, "AavegotchiFacet: Only aavegotchi owner can open a portal");
        s.aavegotchis[_tokenId].randomNumber = uint256(keccak256(abi.encodePacked(block.timestamp)));
        // status is open portal
        s.aavegotchis[_tokenId].status = 1;
    }

    struct PortalAavegotchiTraits {
        uint8 energy;
        uint8 aggressiveeness;
        uint8 spookiness;
        uint8 ethereality;
        uint8 brainSize;
        uint8 eyeShape;
        uint8 eyeColor;
        address collateral;
    }

    function portalAavegotchiTraits(uint256 _tokenId) external view returns (PortalAavegotchiTraits[10] memory _aavegotchiTraits) {
        uint256 randomNumber = s.aavegotchis[_tokenId].randomNumber;
        require(s.aavegotchis[_tokenId].status == 1, "AavegotchiFacet: Portal not open");
        for (uint256 i; i < 10; i++) {
            uint256 randomNumberN = uint256(keccak256(abi.encodePacked(randomNumber, i)));
            _aavegotchiTraits[i].energy = uint8(randomNumberN) % 100;
            _aavegotchiTraits[i].aggressiveeness = uint8(randomNumberN >> 8) % 100;
            _aavegotchiTraits[i].spookiness = uint8(randomNumberN >> 16) % 100;
            _aavegotchiTraits[i].ethereality = uint8(randomNumberN >> 24) % 100;
            _aavegotchiTraits[i].brainSize = uint8(randomNumberN >> 32) % 100;
            _aavegotchiTraits[i].eyeShape = uint8(randomNumberN >> 40) % 100;
            _aavegotchiTraits[i].eyeColor = uint8(randomNumberN >> 48) % 100;
            _aavegotchiTraits[i].collateral = s.collaterals[(randomNumberN >> 248) % s.collaterals.length];
        }
    }

    function claimAavegotchiFromPortal(uint256 _tokenId, uint256 _option) external {
        require(s.aavegotchis[_tokenId].status == 1, "AavegotchiFacet: Portal not open");
        require(msg.sender == s.aavegotchis[_tokenId].owner, "AavegotchiFacet: Only aavegotchi owner can claim aavegotchi from a portal");
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(s.aavegotchis[_tokenId].randomNumber, _option)));
        s.aavegotchis[_tokenId].traits.energy = uint8(randomNumber) % 100;
        s.aavegotchis[_tokenId].traits.aggressiveeness = uint8(randomNumber >> 8) % 100;
        s.aavegotchis[_tokenId].traits.spookiness = uint8(randomNumber >> 16) % 100;
        s.aavegotchis[_tokenId].traits.ethereality = uint8(randomNumber >> 24) % 100;
        s.aavegotchis[_tokenId].traits.brainSize = uint8(randomNumber >> 32) % 100;
        s.aavegotchis[_tokenId].traits.eyeShape = uint8(randomNumber >> 40) % 100;
        s.aavegotchis[_tokenId].traits.eyeColor = uint8(randomNumber >> 48) % 100;
        s.aavegotchis[_tokenId].traits.collateral = s.collaterals[(randomNumber >> 248) % s.collaterals.length];
        s.aavegotchis[_tokenId].status = 2;
    }

    function ghstAddress() external view returns (address contract_) {
        contract_ = s.ghstContract;
    }

    // Given an aavegotchi token id, return the combined SVG of its layers and its wearables
    function getAavegotchiSVG(uint256 _tokenId) public view returns (string memory ag) {
        bytes memory svg;

        if (s.aavegotchis[_tokenId].status == 0) {
            // is a portal
            svg = LibSVG.getSVG(s.itemsSVG, 0);
        } else {
            // bytes32 traits = s.aavegotchis[_tokenId].traits;
            // require(traits != 0, "AavegotchiNFT: _tokenId does not exist");
            // uint256 svgId;
            // // Find and get up to 16 SVG layers
            // for (uint256 i; i < 16; i++) {
            //     svgId = uint256((traits << (i * 16)) >> 240);
            //     if (svgId > 0) {
            //         svg = abi.encodePacked(svg, LibSVG.getSVG(s.aavegotchiLayersSVG, svgId));
            //     }
            // }
            // // add any wearables here
            // uint256 count = s.wearablesSVG.length;
            // for (uint256 i = 0; i < count; i++) {
            //     if (s.nftBalances[address(this)][_tokenId][i << 240] > 0) {
            //         svg = abi.encodePacked(svg, LibSVG.getSVG(s.wearablesSVG, i));
            //     }
            // }
        }
        bytes memory header = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">';
        bytes memory footer = "</svg>";
        ag = string(abi.encodePacked(header, svg, footer));
    }

    // get the first Aavegotchi that someone uses. This function is for demo purposes.
    function getFirstAavegotchi(address _owner) external view returns (uint256 tokenId, string memory svg) {
        require(_owner != address(0), "Aavegotchi: Owner can't be zero address");
        uint256 bal = s.aavegotchiOwnerEnumeration[_owner].length;
        if (bal > 0) {
            tokenId = s.aavegotchiOwnerEnumeration[_owner][0];
            svg = getAavegotchiSVG(tokenId);
        }
    }

    /// @notice Count all NFTs assigned to an owner
    /// @dev NFTs assigned to the zero address are considered invalid, and this
    ///  function throws for queries about the zero address.
    /// @param _owner An address for whom to query the balance
    /// @return balance The number of NFTs owned by `_owner`, possibly zero
    function balanceOf(address _owner) external view returns (uint256 balance) {
        balance = s.aavegotchiOwnerEnumeration[_owner].length;
    }

    /// @notice Enumerate NFTs assigned to an owner
    /// @dev Throws if `_index` >= `balanceOf(_owner)` or if
    ///  `_owner` is the zero address, representing invalid NFTs.
    /// @param _owner An address where we are interested in NFTs owned by them
    /// @param _index A counter less than `balanceOf(_owner)`
    /// @return tokenId The token identifier for the `_index`th NFT assigned to `_owner`,
    ///   (sort order not specified)
    function tokenOfOwnerByIndex(address _owner, uint256 _index) external view returns (uint256 tokenId) {
        uint256 balance = s.aavegotchiOwnerEnumeration[_owner].length;
        require(_index < balance, "AavegotchiNFT: Does not have token at index");
        require(_owner != address(0), "AavegotchiNFT:Owner can't be address(0");
        tokenId = s.aavegotchiOwnerEnumeration[_owner][_index];
    }

    function allAavegotchisOfOwner(address _owner) external view returns (uint256[] memory tokenIds) {
        tokenIds = s.aavegotchiOwnerEnumeration[_owner];
    }

    /// @notice Find the owner of an NFT
    /// @dev NFTs assigned to zero address are considered invalid, and queries
    ///  about them do throw.
    /// @param _tokenId The identifier for an NFT
    /// @return owner The address of the owner of the NFT
    function ownerOf(uint256 _tokenId) external view returns (address owner) {
        owner = s.aavegotchis[_tokenId].owner;
    }

    /// @notice Transfers the ownership of an NFT from one address to another address
    /// @dev Throws unless `msg.sender` is the current owner, an authorized
    ///  operator, or the approved address for this NFT. Throws if `_from` is
    ///  not the current owner. Throws if `_to` is the zero address. Throws if
    ///  `_tokenId` is not a valid NFT. When transfer is complete, this function
    ///  checks if `_to` is a smart contract (code size > 0). If so, it calls
    ///  `onERC721Received` on `_to` and throws if the return value is not
    ///  `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`.
    /// @param _from The current owner of the NFT
    /// @param _to The new owner
    /// @param _tokenId The NFT to transfer
    /// @param _data Additional data with no specified format, sent in call to `_to`
    function safeTransferFrom(
        address _from,
        address _to,
        uint256 _tokenId,
        bytes calldata _data
    ) external {
        transferFromInternal(_from, _to, _tokenId);
        uint256 size;
        assembly {
            size := extcodesize(_to)
        }
        if (size > 0) {
            require(
                ERC721_RECEIVED == ERC721TokenReceiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data),
                "ERC721: Transfer rejected/failed by _to"
            );
        }
    }

    /// @notice Transfers the ownership of an NFT from one address to another address
    /// @dev This works identically to the other function with an extra data parameter,
    ///  except this function just sets data to "".
    /// @param _from The current owner of the NFT
    /// @param _to The new owner
    /// @param _tokenId The NFT to transfer
    function safeTransferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) external {
        transferFromInternal(_from, _to, _tokenId);
        uint256 size;
        assembly {
            size := extcodesize(_to)
        }
        if (size > 0) {
            require(
                ERC721_RECEIVED == ERC721TokenReceiver(_to).onERC721Received(msg.sender, _from, _tokenId, ""),
                "ERC721: Transfer rejected/failed by _to"
            );
        }
    }

    /// @notice Transfer ownership of an NFT -- THE CALLER IS RESPONSIBLE
    ///  TO CONFIRM THAT `_to` IS CAPABLE OF RECEIVING NFTS OR ELSE
    ///  THEY MAY BE PERMANENTLY LOST
    /// @dev Throws unless `msg.sender` is the current owner, an authorized
    ///  operator, or the approved address for this NFT. Throws if `_from` is
    ///  not the current owner. Throws if `_to` is the zero address. Throws if
    ///  `_tokenId` is not a valid NFT.
    /// @param _from The current owner of the NFT
    /// @param _to The new owner
    /// @param _tokenId The NFT to transfer
    function transferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) external {
        transferFromInternal(_from, _to, _tokenId);
    }

    // This function is used by transfer functions
    function transferFromInternal(
        address _from,
        address _to,
        uint256 _tokenId
    ) internal {
        require(_to != address(0), "ER721: Can't transfer to 0 address");
        address owner = s.aavegotchis[_tokenId].owner;
        uint256 index = s.aavegotchis[_tokenId].ownerEnumerationIndex;
        require(owner != address(0), "ERC721: Invalid tokenId or can't be transferred");
        require(
            msg.sender == owner || s.operators[owner][msg.sender] || s.approved[_tokenId] == msg.sender,
            "ERC721: Not owner or approved to transfer"
        );
        require(_from == owner, "ERC721: _from is not owner, transfer failed");
        s.aavegotchis[_tokenId].owner = _to;
        s.aavegotchis[_tokenId].ownerEnumerationIndex = uint32(s.aavegotchiOwnerEnumeration[_to].length);
        s.aavegotchiOwnerEnumeration[_to].push(_tokenId);
        uint256 lastIndex = s.aavegotchiOwnerEnumeration[_from].length - 1;
        if (index != lastIndex) {
            uint256 lastTokenId = s.aavegotchiOwnerEnumeration[_from][lastIndex];
            s.aavegotchiOwnerEnumeration[_from][index] = lastTokenId;
            s.aavegotchis[lastTokenId].ownerEnumerationIndex = uint32(index);
        }
        s.aavegotchiOwnerEnumeration[_from].pop();
        if (s.approved[_tokenId] != address(0)) {
            delete s.approved[_tokenId];
            emit Approval(owner, address(0), _tokenId);
        }
        emit Transfer(_from, _to, _tokenId);
        emit TransferSingle(msg.sender, _from, _to, _tokenId, 1);
    }

    /// @notice Change or reaffirm the approved address for an NFT
    /// @dev The zero address indicates there is no approved address.
    ///  Throws unless `msg.sender` is the current NFT owner, or an authorized
    ///  operator of the current owner.
    /// @param _approved The new approved NFT controller
    /// @param _tokenId The NFT to approve
    function approve(address _approved, uint256 _tokenId) external {
        address owner = s.aavegotchis[_tokenId].owner;
        require(owner == msg.sender || s.operators[owner][msg.sender], "ERC721: Not owner or operator of token.");
        s.approved[_tokenId] = _approved;
        emit Approval(owner, _approved, _tokenId);
    }

    /// @notice Enable or disable approval for a third party ("operator") to manage
    ///  all of `msg.sender`'s assets
    /// @dev Emits the ApprovalForAll event. The contract MUST allow
    ///  multiple operators per owner.
    /// @param _operator Address to add to the set of authorized operators
    /// @param _approved True if the operator is approved, false to revoke approval
    function setApprovalForAll(address _operator, bool _approved) external {
        s.operators[msg.sender][_operator] = _approved;
        emit ApprovalForAll(msg.sender, _operator, _approved);
    }

    /// @notice Get the approved address for a single NFT
    /// @dev Throws if `_tokenId` is not a valid NFT.
    /// @param _tokenId The NFT to find the approved address for
    /// @return approved The approved address for this NFT, or the zero address if there is none
    function getApproved(uint256 _tokenId) external view returns (address approved) {
        require(_tokenId < s.totalSupply, "ERC721: tokenId is invalid");
        approved = s.approved[_tokenId];
    }

    /// @notice Query if an address is an authorized operator for another address
    /// @param _owner The address that owns the NFTs
    /// @param _operator The address that acts on behalf of the owner
    /// @return approved True if `_operator` is an approved operator for `_owner`, false otherwise
    function isApprovedForAll(address _owner, address _operator) external view returns (bool approved) {
        approved = s.operators[_owner][_operator];
    }
}