import jwt from 'jsonwebtoken'; // 

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No autorizado - token faltante' });
  }

  const token = authHeader.split(' ')[1];
  console.log('🔐 Token recibido:', token); // 

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded; // Aquí guardo el usuario decodificado
    console.log('🧍 Usuario decodificado:', decoded); 
    next();
  } catch (error) {
    console.error('❌ Token inválido:', error);
    res.status(401).json({ message: 'Token inválido' });
  }
};