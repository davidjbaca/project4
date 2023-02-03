import S3 from "aws-sdk/clients/s3.js";

let config = {}


// Check to see if this code is running on cyclic
// if so create a new config variable to be passed to the S3 constructor
// aws names are reserved on cyclic, so we have to use differnt names for our variables
// refer to the docs for more information - https://docs.cyclic.sh/concepts/env_vars#reserved-environment-variables
if(process.env.CYCLIC_APP_ID){
	console.log('ahppeingg!')
	config = {
		region: process.env.MY_REGION,
		credentials:{
			accessKeyId: process.env.AKIAQDVLGWIJI5N7U5PQ,
			secretAccessKey: process.env.neT82weMHBri4KMRJO10HVo1cxaLzxaKj58QEZFt
		}
	  }
}

console.log(process.env.CYCLIC_APP_ID, ' prod ')


export const s3 = new S3(config); 