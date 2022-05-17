class Image {
  constructor(data = {}) {
    this.imageId = null;
    this.name = null;
    this.category = null;
    this.location = null;
    this.storageLink = null;
    this.rating = null;
    this.ratingCounter = null;
    this.owner = null;
    Object.assign(this, data);
  }
}
export default Image;
