const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

login = (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "admin") {

    const token = jwt.sign({ isAdmin: true }, SECRET_KEY, { expiresIn: "30m" });
    const refreshToken = jwt.sign({ isAdmin: true }, SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });

    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid username or password" });
  }
};

refreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(403).json({ error: "No refresh token provided" });
  }

  try {
    jwt.verify(refreshToken, process.env.SECRET_KEY);
    
    const newToken = jwt.sign({ isAdmin: true }, process.env.SECRET_KEY, {
      expiresIn: "15m",
    });

    res.json({ token: newToken });
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired refresh token" });
  }
};

module.exports = { login, refreshToken };
