const express = require('express');

const teams = [
  {
    id: 1,
    name: 'São Paulo Futebol Clube',
    initials: 'SPF',
  },
  {
    id: 2,
    name: 'Clube Atlético Mineiro',
    initials: 'CAM',
  },
];

const app = express();

app.use(express.json());

// colocando rotas pra ver no navegador = get (visualiza)
app.get('/', (req, res) => res.status(200).json({ message: 'Olá Mundo!' }));

// criando nova rota com minha API = get
app.get('/teams', (req, res) => res.status(200).json({ teams }));

// pra adicionar novos dados com a extesão thunder client = post
app.post('/teams', (req, res) => {
  const newTeam = { ...req.body };
  teams.push(newTeam);

  res.status(201).json({ team: newTeam });
});

// pra modificar algum dado da api = put
app.put('/teams/:id', (req, res) => {
  const { id } = req.params;
  const { name, initials } = req.body;
  let updatedTeam;

  for (let i = 0; i < teams.length; i += 1) {
    const team = teams[i];

    if (team.id === Number(id)) {
      team.name = name;
      team.initials = initials;
      updatedTeam = team;
    }
  }

  res.status(200).json({ updatedTeam });
});

// feito por mim, pra mostrar um time pelo seu id na URL = GET
app.get('/teams/:id', (req, res) => {
  const { id } = req.params;
  let renderTeam;

  for (let i = 0; i < teams.length; i += 1) {
    const team = teams[i];

    if (team.id === Number(id)) {
      renderTeam = team;
    }
  }

  res.status(200).json({ renderTeam });
});

// deletando dados através do DELETE
app.delete('/teams/:id', (req, res) => {
  const { id } = req.params;
  const arrayPosition = teams.findIndex((team) => team.id === Number(id));
  teams.splice(arrayPosition, 1);

  res.status(200).end();
});

module.exports = app;
