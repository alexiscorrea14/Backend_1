import cartRepository from "../dao/repositories/cartRepository.js";

export const getCart = async (req, res) => {
  try {
    const cart = await cartRepository.getById(req.params.cid);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener carrito", error });
  }
};

export const addProductToCart = async (req, res) => {
  try {
    // Lógica para agregar productos al carrito
    res.status(200).json({ message: "Producto agregado al carrito" });
  } catch (error) {
    res.status(500).json({ message: "Error al agregar producto", error });
  }
};
