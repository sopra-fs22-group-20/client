/**
 * User model
 */
class User {
  constructor(data = {}) {
    this.id = null;
    this.name = null;
    // new email address
    this.email = null;
    this.username = null;
    this.token = null;
    this.status = null;
    Object.assign(this, data);
  }
}
export default User;
