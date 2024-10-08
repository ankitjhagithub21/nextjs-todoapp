import jwt from 'jsonwebtoken';

export function verifyToken(req) {
    
  const token = req.cookies.get('token') 

  if (!token) {
    return { valid: false, error: "No token provided." };
  }
  
  try {
    // Verify the token with the secret
    const decoded = jwt.verify(token.value, process.env.JWT_TOKEN);
    return { valid: true, decoded};

  } catch (error) {
    return { valid: false, error: "Invalid token." };
  }
}
