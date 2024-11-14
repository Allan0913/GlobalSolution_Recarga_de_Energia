const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db/database');
const router = express.Router();
const JWT_SECRET = 'seu-segredo-aqui';
router.post('/register', (req, res) => {
  const { username, password, confirmPassword } = req.body;
  let { role } = req.body;
  
  if (!role) {
    role = 'user';
  }
  console.log('Dados recebidos:', { username, role }); 
  
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'As senhas não coincidem.' });
  }
  
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
    if (err) {
      console.error('Erro ao verificar o usuário:', err);
      return res.status(500).json({ message: 'Erro ao verificar o usuário.' });
    }
    if (row) {
      return res.status(400).json({ message: 'Usuário já existe.' });
    }
    
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return res
          .status(500)
          .json({ message: 'Erro ao registrar o usuário.' });
      }
      
      db.run(
        'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
        [username, hash, role],
        function (err) {
          if (err) {
            console.error('Erro ao inserir o usuário:', err);
            return res
              .status(500)
              .json({ message: 'Erro ao registrar o usuário.' });
          }
          res.status(201).json({ message: 'Usuário registrado com sucesso.' });
        }
      );
    });
  });
});

router.get('/users', (req, res) => {
  const { username, id } = req.query;
  if (username) {
    
    db.get(
      'SELECT * FROM users WHERE username = ?',
      [username],
      (err, user) => {
        if (err) {
          console.error('Erro ao buscar usuário:', err);
          return res.status(500).json({ message: 'Erro ao buscar usuário.' });
        }
        if (!user) {
          return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        res.json(user);
      }
    );
  } else if (id) {
    
    db.get('SELECT * FROM users WHERE id = ?', [id], (err, user) => {
      if (err) {
        console.error('Erro ao buscar usuário:', err);
        return res.status(500).json({ message: 'Erro ao buscar usuário.' });
      }
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }
      res.json(user);
    });
  } else {
    
    db.all('SELECT * FROM users', [], (err, users) => {
      if (err) {
        console.error('Erro ao buscar usuários:', err);
        return res.status(500).json({ message: 'Erro ao buscar usuários.' });
      }
      res.json(users);
    });
  }
});

router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  
  db.get('SELECT * FROM users WHERE id = ?', [id], (err, user) => {
    if (err) {
      console.error('Erro ao buscar usuário:', err);
      return res.status(500).json({ message: 'Erro ao buscar usuário.' });
    }
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    res.json(user);
  });
});

router.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { username, password, role } = req.body;
  
  if (password) {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return res
          .status(500)
          .json({ message: 'Erro ao criptografar a senha.' });
      }
      
      db.run(
        'UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?',
        [username, hash, role, id],
        function (err) {
          if (err) {
            console.error('Erro ao atualizar usuário:', err);
            return res
              .status(500)
              .json({ message: 'Erro ao atualizar o usuário.' });
          }
          res.status(200).json({ message: 'Usuário atualizado com sucesso.' });
        }
      );
    });
  } else {
    
    db.run(
      'UPDATE users SET username = ?, role = ? WHERE id = ?',
      [username, role, id],
      function (err) {
        if (err) {
          console.error('Erro ao atualizar usuário:', err);
          return res
            .status(500)
            .json({ message: 'Erro ao atualizar o usuário.' });
        }
        res.status(200).json({ message: 'Usuário atualizado com sucesso.' });
      }
    );
  }
});

router.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
    if (err) {
      console.error('Erro ao deletar usuário:', err);
      return res.status(500).json({ message: 'Erro ao deletar o usuário.' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    res.status(200).json({ message: 'Usuário deletado com sucesso.' });
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }
    
    bcrypt.compare(password, user.password, (err, match) => {
      if (err || !match) {
        return res.status(401).json({ message: 'Credenciais inválidas.' });
      }
      
      const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
        expiresIn: '1h',
      });
      res.json({ token });
    });
  });
});

router.post('/get-user', (req, res) => {
  const { username } = req.body;
  
  if (!username) {
    return res.status(400).json({ message: 'Username não fornecido' });
  }

  const sql = 'SELECT id, username, role FROM users WHERE username = ?';
  db.get(sql, [username], (err, user) => {
    if (err) {
      console.error('Erro ao buscar usuário:', err);
      return res.status(500).json({ message: 'Erro ao buscar usuário' });
    }
    
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    console.log('Usuário encontrado:', user); // Log para debug
    res.json(user);
  });
});

module.exports = router;
