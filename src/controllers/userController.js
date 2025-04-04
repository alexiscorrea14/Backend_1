import userRepository from "../dao/repositories/userRepository.js";

export const registerUser = async (req, res) => {
  try {
    const user = await userRepository.create(req.body);
    res.status(201).json({ message: "Usuario registrado", user });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar usuario", error });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const userDTO = {
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    };
    res.status(200).json(userDTO);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuario", error });
  }
};
