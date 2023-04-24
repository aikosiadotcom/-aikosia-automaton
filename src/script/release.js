import { execSync }  from 'child_process';
import {readPackage} from 'read-pkg';

const json = await readPackage();
console.log(json.version);

console.log("sync with remote files");
execSync(`git pull origin`);

console.log("commit changes");
execSync(`git add * && git commit -m \"Release v${json.version}\"`);

console.log("push to server");
execSync(`git push origin`);
