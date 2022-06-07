const fs=require("fs");
const path=require("path");


function treeHelper(dirpath,indent){
    let isFile=fs.lstatSync(dirpath).isFile();

    if(isFile){
        let fileName=path.basename(dirpath);
        console.log(indent+"├──"+fileName);
    }
    else{
        let dirName=path.basename(dirpath);
        console.log(indent+"└──"+dirName);

        let child=fs.readdirSync(dirpath);
        for(let i=0;i<child.length;i++){
            let childFullPath=path.join(dirpath,child[i]);
            treeHelper(childFullPath,indent+"\t");
        }
    }
}
function tree(dirPath){
    dirPath=(dirPath==undefined)?process.cwd():dirPath;

    if(fs.existsSync(dirPath)){
        treeHelper(dirPath,"");
    }
    else{
        console.log("Please 🙏 enter the correct directory path");
    }
    
}

module.exports=tree;