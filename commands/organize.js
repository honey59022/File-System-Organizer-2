const fs=require("fs");
const path=require("path");



function createOrganizedFolder(dirPath){
    let organizedFolderPath=path.join(dirPath,"organized Folder");
    
    if(fs.existsSync(organizedFolderPath)==false)fs.mkdirSync(organizedFolderPath);

    return organizedFolderPath;
}
function createFolderPaths(src,dest){
    let childnames=fs.readdirSync(src);

    for(let i=0;i<childnames.length;i++){
        let childaddress=path.join(src,childnames[i]);
        
        if(fs.lstatSync(childaddress).isFile()){
            let folderName=path.extname(childaddress).substring(1);
            let folderaddress=path.join(dest,folderName);

            if(fs.existsSync(folderaddress)==false)fs.mkdirSync(folderaddress);
        }
    }
}
function checkPathAlreadyExistOrNot(filePathInFolder){
    //This case is for the path of the file if it already exist in the new organized sub folder 
    //This case arise when two file came with same in the organized sub folder
    //if we organize the super folder one time and again our super folder add more files in it then if we try to organize all
    // files again then there may be a chance that in organize subfolder two files came with same name


    console.log(filePathInFolder);


    if(fs.existsSync(filePathInFolder)==true){
        const readLineSync=require("readline-sync");
        let q=`This name File\t [${path.basename(filePathInFolder)}]\t already Exist Give Different Name For This File -> \t`;

        // Wait for user's response.
        let fileName = readLineSync.question(q);
        

        
        //new file path in the folder because of new name
        let dirname=path.dirname(filePathInFolder);
        fileName+=path.extname(filePathInFolder);
        let newFilePathInFolder=path.join(dirname,fileName);
        

        return checkPathAlreadyExistOrNot(newFilePathInFolder);
    }
    else{
        return filePathInFolder;
    }
}
function cutAndPasteFiles(src,dest){
    let childnames=fs.readdirSync(src);

    for(let i=0;i<childnames.length;i++){
        let childaddress=path.join(src,childnames[i]);
        
        if(fs.lstatSync(childaddress).isFile()){
            let folderName=path.extname(childaddress).substring(1);
            let folderaddress=path.join(dest,folderName);
            let fileAddressInFolder=path.join(folderaddress,childnames[i]);

            fileAddressInFolder=checkPathAlreadyExistOrNot(fileAddressInFolder);

            let content=fs.readFileSync(childaddress);
            fs.writeFileSync(fileAddressInFolder,content);

            fs.unlinkSync(childaddress);
        }
    }

}

function organize(dirPath){
    
    if(dirPath==undefined){
        const readLineSync=require('readline-sync');
        const question="Are you sure You want to organize your current working directiory that is \n"+__dirname+"\nif Yes then write Y and if No then write N\t";

        const ans=readLineSync.question(question);
        if(ans=="Y")dirPath=__dirname;
        else return;
    }
    else if(fs.existsSync(dirPath)==false && fs.lstatSync(dirPath).isFile()){
        console.log("Please 🙏 Provide Correct Path ");
        return;
    }
    
    let organizedFolderPath=createOrganizedFolder(dirPath);
    createFolderPaths(dirPath,organizedFolderPath);
    cutAndPasteFiles(dirPath,organizedFolderPath);

}

module.exports=organize;