const db = require("../db/database");

const getUserRole = (req, res) => {
  const { username } = req.body;
  const sql = `SELECT role FROM users WHERE username = ?`;
  db.get(sql, [username], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.log(row);
    if (!row) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.json({ role: row.role });
  });
};

const getAllConsultations = (req, res) => {
  const { username } = req.query;
  console.log("Username recebido:", username);
  if (!username) {
    return res.status(400).json({ error: "Username não fornecido" });
  }
  let sql;
  let params = [];
  const userRoleSql = `SELECT role, id FROM users WHERE username = ?`;
  db.get(userRoleSql, [username], (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.log("Usuário encontrado:", user);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    const userRole = user.role;
    const userId = user.id;
    if (userRole === "admin") {
      sql = `SELECT consultations.*, users.username FROM consultations 
             JOIN users ON consultations.userId = users.id`;
    } else {
      sql = `SELECT consultations.*, users.username FROM consultations 
             JOIN users ON consultations.userId = users.id 
             WHERE consultations.userId = ?`;
      params = [userId];
    }
    db.all(sql, params, (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ consultations: rows });
    });
  });
};

const createConsultation = (req, res) => {
  const { userId, date, doctor, specialty, status } = req.body;

  // Validações básicas
  if (!userId || !date || !doctor || !specialty) {
    return res.status(400).json({ 
      error: "Todos os campos são obrigatórios" 
    });
  }

  // Verificar se o usuário existe
  const checkUserSql = "SELECT * FROM users WHERE id = ?";
  db.get(checkUserSql, [userId], (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Inserir a consulta
    const sql = `
      INSERT INTO consultations (userId, date, doctor, specialty, status) 
      VALUES (?, ?, ?, ?, ?)
    `;
    const params = [userId, date, doctor, specialty, status || "Agendada"];

    db.run(sql, params, function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      // Buscar a consulta recém-criada com os dados do usuário
      const getConsultationSql = `
        SELECT consultations.*, users.username 
        FROM consultations 
        JOIN users ON consultations.userId = users.id 
        WHERE consultations.id = ?
      `;
      
      db.get(getConsultationSql, [this.lastID], (err, consultation) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        
        res.status(201).json({
          message: "Consulta criada com sucesso!",
          consultation: consultation
        });
      });
    });
  });
};

const updateConsultation = (req, res) => {
  const { id } = req.params;
  const { date, doctor, specialty, status, userId } = req.body;
  const sql = `UPDATE consultations SET date = ?, doctor = ?, specialty = ?, status = ?, userId = ? WHERE id = ?`;
  const params = [date, doctor, specialty, status, userId, id];
  db.run(sql, params, function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ message: "Consulta atualizada com sucesso." });
  });
};

module.exports = {
  getAllConsultations,
  createConsultation,
  updateConsultation,
  getUserRole,
};
