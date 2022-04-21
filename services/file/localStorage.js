const path = require('path');
const fs = require('fs/promises');
const User = require('../../repository/users');

class LocalStorage {
   constructor(file, user) {
      this.file = file;
      this.user = user;
      this.static = process.env.STATIC_FOLDER;
   }

   async saveAvatar() {
      const destination = path.join(this.static, 'avatars', this.user.id);
      await fs.mkdir(destination, { recursive: true });
      await fs.rename(this.file.path, path.join(destination, this.file.filename));
      const urlOfAvatar = path.normalize(path.join(this.user.id, this.file.filename));
      await User.updateAvatar(this.user.id, urlOfAvatar);
      return urlOfAvatar;
   }

}

module.exports = LocalStorage;