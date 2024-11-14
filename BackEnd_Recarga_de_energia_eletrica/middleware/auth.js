const jwt = require('jsonwebtoken');
const JWT_SECRET = 'seu-segredo-aqui';

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Token decodificado:', decoded);
    
    if (!decoded.id || !decoded.role) {
      return res.status(401).json({ message: 'Token inválido: informações ausentes' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error('Erro na autenticação:', error);
    res.status(401).json({ message: 'Token inválido' });
  }
};

module.exports = authMiddleware; 