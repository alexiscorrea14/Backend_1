export const authenticateUser = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Acceso no autorizado" });
  }
  next();
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Acceso solo para administradores" });
  }
  next();
};

export const isUser = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(403).json({ message: "Acceso solo para usuarios" });
  }
  next();
};
