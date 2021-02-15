

async function fix(orgMeta, userPermissionStart){
	var userPermissionNames = userPermissionStart;
	try {
    	
        for(const k of orgMeta.keys()){ 
			let metadataProfile = orgMeta.get(k);
			const objectNames = [];
			
			if(metadataProfile.hasOwnProperty('userPermissions') && typeof metadataProfile.userPermissions !== 'undefined'){
				if(metadataProfile.custom === 'false'){
					metadataProfile.userPermissions = [];
					orgMeta.set(k, metadataProfile);
				} else {
          			if (!Array.isArray(metadataProfile.userPermissions)) {
						if (objectNames.includes(metadataProfile.userPermissions.name)) {
						  	objectNames.push(metadataProfile.userPermissions.name);
						}             
					  	metadataProfile.userPermissions = Object.entries(metadataProfile.userPermissions);
				  	} else {
						//console.log('metadataProfile.userPermission.lenght: '+metadataProfile.userPermission.length);
						for(var userPermission of metadataProfile.userPermissions){
						  	if ( userPermission  !== null && userPermission.name !== null  && !objectNames.includes(userPermission.name)) {
								//console.log('User Permission Name: '+ userPermission.name);
                				objectNames.push(userPermission.name);
						  	}
						}
					}

					console.log('objectNames: ', objectNames);
          
					//console.log('User Permission Name First Elem: '+ userPermissionNames[0]);
					let difference = userPermissionNames.filter(x => !objectNames.includes(x));

					//console.log('difference.length: '+difference.length);

					console.log('objectNames: '+ metadataProfile.fullName);
					console.log('DIFFERENCE: '+JSON.stringify(difference));
              
              		Object.entries(difference).forEach(([key, value]) => {
                		var newObjPerm = {
							enabled: 'false',
							name: value
						};
						//console.log('newObjPerm:'+ JSON.stringify(newObjPerm));
                		metadataProfile.userPermissions.push(newObjPerm);               
              		});

              		metadataProfile.userPermissions = metadataProfile.userPermissions.sort((a, b) => (a.name > b.name) ? 1 : -1);
				}

				orgMeta.set(k, metadataProfile);
			}
                      
        };
        
   		return orgMeta;
	} catch (error) {
    	console.log('sono nel catch di f() userPermission!' + error.message);
    }
}

async function fix2(orgMeta){
    // console.log('profile struct   ',orgMeta);
    for(const k of orgMeta.keys()){
        // console.log(' profile name nel ciclo  '+k);
        let profile = orgMeta.get(k);
        if(profile.custom === 'false' && profile.hasOwnProperty('userPermissions') && typeof profile.userPermissions !== 'undefined'){
            profile.userPermissions = [];
            orgMeta.set(k, profile);
        }



        //  objectNames.push(permObject.object);
/*
        profile["@"]={"xmlns":"http://soap.sforce.com/2006/04/metadata"};
        var options = {
          declaration: {
              "encoding": "UTF-8"
          }
        };
        var xml=js2xmlparser.parse("Profile", profile, options);
       
        fs.writeFile(dirname + profile.fullName+'.profile-meta.xml', format(xml, {collapseContent: true}), function(err, data) {
          if (err) {
            console.log(err);
          }
          else {
           console.log('profili updated!');
          }
        });
        */
    }

    /*orgMeta.forEach(function(metadataProfile){
        console.log(metadataProfile.fullName + (metadataProfile.custom === 'true' ? ' is custom' : ' is standard'));
        if(metadataProfile.custom === 'false'){
            if ( metadataProfile.hasOwnProperty('userPermissions') &&  typeof metadataProfile.userPermissions !== 'undefined') {
                //       console.log('  objectPermission length  '+metadataProfile.userPermissions.length);
                //       console.log('  instance off   ',Array.isArray(metadataProfile.userPermissions));
                       
                       metadataProfile.userPermissions = [];
               //        M_ProfName_OBJPerm[metadataProfile.fullName] = M_ProfName_OBJPerm[metadataProfile.fullName] || {};
                 //      M_ProfName_OBJPerm[metadataProfile.fullName].push(metadataProfile);
                  //     console.log('profile struct after delete   ',metadataProfile);
                  mapafter.set(metadataProfile.fullName,metadataProfile);
    
            }
        }
         
    });*/
    
    // console.log(' mapafter ',mapafter); 
    //console.log('struct di admin ', mapafter.get('Admin'));
    return orgMeta;
    
}

module.exports = { fix };

