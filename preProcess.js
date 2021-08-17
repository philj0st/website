import fs from "fs";
import path from "path";
import sizeOf from "image-size";

const imagesDirectory = path.join(process.cwd(), "public/images");

const isDirectory = (dirName) => {
  return fs.lstatSync(dirName).isDirectory();
};

console.log(`reading images from ${imagesDirectory}`);

let directories = [];
let images = [];

try {
  if (fs.existsSync(imagesDirectory)) {
    directories = fs
      .readdirSync(imagesDirectory)
      .map((entry) => path.join(imagesDirectory, entry))
      .filter(isDirectory);
  }
  directories.forEach((dir) => {
    fs.readdirSync(dir).forEach((filename) =>
      images.push(path.join(dir, filename))
    );
  });
} catch (err) {
  console.error(err);
}
console.log(
  `found ${images.length} images in ${directories.length} sub directories`
);

images = images.map((img) => {
  const dimensions = sizeOf(img);
  return {
    src: img,
    width: dimensions.width,
    height: dimensions.height,
  };
});

fs.writeFile("./lib/imageData.json", JSON.stringify(images), (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("file written successfully");
});
