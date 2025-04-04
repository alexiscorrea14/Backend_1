import UserModel from "../models/userModel.js";

class UserRepository {
  async create(userData) {
    return await UserModel.create(userData);
  }

  async findByEmail(email) {
    return await UserModel.findOne({ email });
  }
}

export default UserRepository;

