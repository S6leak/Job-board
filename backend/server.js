const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connexion à PostgreSQL
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 5432
});

// Route de test
app.get('/', (req, res) => {
    res.json({ message: 'API ok' });
});

// Récupérer toutes les offres
app.get('/ads', async (req, res) => {
    const result = await pool.query('SELECT * FROM advertisements');
    res.json(result.rows);
});

// Récupérer une offre par son id
app.get('/ads/:id', async (req, res) => {
    const result = await pool.query('SELECT * FROM advertisements WHERE id = $1', [req.params.id]);
    res.json(result.rows[0]);
});

// Créer offre
app.post('/ads', async (req, res) => {
    const { job_title, short_desc, long_desc, salary, location, company_id } = req.body;
    const result = await pool.query(
        'INSERT INTO advertisements (job_title, short_desc, long_desc, salary, location, company_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [job_title, short_desc, long_desc, salary, location, company_id]
    );
    res.json(result.rows[0]);
});

// Modifier offre
app.put('/ads/:id', async (req, res) => {
    const { job_title, short_desc, long_desc, salary, location } = req.body;
    const result = await pool.query(
        'UPDATE advertisements SET job_title=$1, short_desc=$2, long_desc=$3, salary=$4, location=$5 WHERE id=$6 RETURNING *',
        [job_title, short_desc, long_desc, salary, location, req.params.id]
    );
    res.json(result.rows[0]);
});

// Suppr offre
app.delete('/ads/:id', async (req, res) => {
    await pool.query('DELETE FROM advertisements WHERE id = $1', [req.params.id]);
    res.json({ message: 'Offre supprimée' });
});

app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
});