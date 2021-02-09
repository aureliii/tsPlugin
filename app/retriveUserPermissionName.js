var jsforce = require('jsforce');
var fs = require('fs');
var path = require('path');
let permissionName = [];



async function getNames() {
    let creds = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../salesforce-creds.json')).toString());
    let conn = new jsforce.Connection({
        loginUrl: creds.url,
        version: '50.0'
    });
    
    await conn.login(creds.username, creds.password);

    await conn.sobject("UserPermissionAccess").describe(function(err, metadata){
        if(err){ return console.error(err); }
        console.log('Label: ' + metadata.label);
        console.log('Number of Fields: ' + metadata.fields.length);
        metadata.fields.forEach(element => {
            if(element.name.startsWith('Permissions'))
                permissionName.push(element.name.replace('Permissions', ''));
        });
    });
    console.log('All permissionName: ', permissionName);
    return permissionName;
}

module.exports = { getNames };