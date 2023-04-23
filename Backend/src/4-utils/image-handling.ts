import { UploadedFile } from "express-fileupload";
import path from "path";
import { v4 as uuid } from "uuid";
import fsPromises from "fs/promises";

const imagesFolder = path.join(__dirname,"..","1-assets","images");

function getImagePath(imageName: string): string {
    return imagesFolder + "/" + imageName;
}

async function saveImage(image: UploadedFile):Promise<string> {
    const extension = image.name.substring(image.name.lastIndexOf("."));
    const uniqueName = uuid() + extension;
    const absolutePath = getImagePath(uniqueName);
    await image.mv(absolutePath);

    return uniqueName;
}

async function updateImage(image: UploadedFile, existingName: string):Promise<string> {

    await deleteImage(existingName);
    const uniqueName = await saveImage(image);
    return uniqueName;
}

async function deleteImage(imageName: string):Promise<void> {
    
  try {  
        if(!imageName) return;

        const absolutePath = getImagePath(imageName);

        await fsPromises.unlink(absolutePath);
    }
    catch (err:any) {
        console.error(err.message);
    }
}

export default {
    getImagePath,
    saveImage,
    updateImage,
    deleteImage
};