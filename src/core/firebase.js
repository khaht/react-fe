import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

export class Firebase {
  constructor(conf1) {
    if (!firebase.apps.length) {
      this.default = firebase.initializeApp(conf1);
    }
    this.auth = this.default.auth();
    this.storage = this.default.storage();
  }

  signIn(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signOut() {
    return this.auth.signOut();
  }

  getCurrentUser() {
    return new Promise((r) => this.auth.onAuthStateChanged(r));
  }

  signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('openid');
    provider.addScope('profile');
    provider.addScope('email');
    return this.auth.signInWithPopup(provider);
  }

  /**
   * userId is the id of the uploading user,
   * file must be a File type this will be uploaded to firebase storage server
   */
  uploadProfileImage = async (userId, file) => {
    if (!userId || !file || typeof userId !== 'string' || !file.name) return;
    const timestamp = Math.random()
      .toString(36)
      .substr(2, 9);
    const fileName = `${timestamp}.${file.name.split('.').pop()}`;
    await this.storage
      .ref('/images')
      .child(userId)
      .child(fileName)
      .put(file)
      .then(async () => {
        const imageRef = this.storage
          .ref('images')
          .child(userId)
          .child(fileName);
        await imageRef.getDownloadURL().then((fireBaseUrl) => fireBaseUrl);
      });
  };

  deleteProfileImage = async (url) => {
    if (!url && typeof url !== 'string') return;
    await this.storage.refFromURL(url).delete();
  };
}

const fbConf = JSON.parse(process.env.REACT_APP_FIREBASE_CONF);
export default new Firebase(fbConf);
