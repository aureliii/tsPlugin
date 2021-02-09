
const retriveMTDfromOrg = require("./retriveMTDfromOrg");
const retriveObjName = require("./retriveObjName");
const retriveUsrPerms = require("./retriveUserPermissionName");
const objectPermissionsFix = require("./objectPermissionsFix");
const retrieveStandardProfile = require("./retrieveStandardProfiles");
const fixUserPermission = require("./userPermissionFix");
const removeFromTemplate = require("./removeFromTemplate");
const writeProfile = require("./writeProfile");

console.log('ciao main');

async function start(conn){
 // 	const standardProfiles = await retrieveStandardProfile.getStandardProfile(conn);
    const objsName = await retriveObjName.getObjsName(conn);

    const userPermissionsName = await retriveUsrPerms.getNames(conn);
    //await console.log('userPermissionsName: '+userPermissionsName);

    var orgMeta = await retriveMTDfromOrg.run(conn);
    orgMeta = await fixUserPermission.fix(orgMeta, userPermissionsName);
    orgMeta = await removeFromTemplate.fix(orgMeta);
    orgMeta = await objectPermissionsFix.fix(orgMeta, objsName);
    
  	await writeProfile.write(orgMeta);
};

module.exports = { start };