const jimp = require('jimp');


class AvatarService {
   constructor(Storage, file, user) {
      this.storage = new Storage(file, user);
      this.pathFile = file.path

   }

   async updateAvatar() {
      await this.transformAvatar(this.pathFile);
      const urlOfAvatar = await this.storage.saveAvatar();
      return urlOfAvatar;
   }
   async transformAvatar(pathFile) {
      const img = await jimp.read(pathFile);
      await img
         .autocrop()
         .cover(
            250,
            250,
            jimp.HORIZONTAL_ALIGN_CENTER | jimp.VERTICAL_ALIGN_MIDDLE
         )
         .writeAsync(pathFile);
   }

}

module.exports = AvatarService;