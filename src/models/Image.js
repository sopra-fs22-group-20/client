class Image {
  constructor(data = {}) {
    this.title = null;
    this.category = null;
    this.location = null;
    this.downloadURL = null;
    Object.assign(this, data);
  }
}
export default Image;
