interface CommunityInfo {
  name: string;
  imageUrl: string;
}

const communityMap = new Map<string, CommunityInfo>();

communityMap.set("0x59d59097e71b2cfd5d2da470843033dbd94be4ef", {
  name: "ECOChain.eth",
  imageUrl: "eco50.jpg",
});

communityMap.set("0x5a424950765e5ef7b974af23b37a0a17e742e922", {
  name: "SilentSociety.eth",
  imageUrl: "silentLogo.jpg",
});

communityMap.set("0xda3282b90ee6144fe8fe00c23225e8989018fc82", {
  name: "CartesiGrantDAO.eth",
  imageUrl: "cartesiLogo50.jpg",
});

communityMap.set("0x61ab51be7c866a54b0b442c149d7715367743efd", {
  name: "SporkDAO.eth",
  imageUrl: "sporkIcon.png",
});


// Export the map if you want to use it in other files
export { communityMap };

//const communityInfo = comunityMap.get("address");


// ORG address: 0x61ab51be7c866a54b0b442c149d7715367743efd
// ECO CHAIN: 0x59d59097e71b2cfd5d2da470843033dbd94be4ef
// SILENT SOCIETY: 0x5a424950765e5ef7b974af23b37a0a17e742e922
// CGP: 0xda3282b90ee6144fe8fe00c23225e8989018fc82
