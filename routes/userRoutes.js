const fs = require('fs');
const { join } = require('path');

const filePath = join(__dirname, 'users.json');

const getUsers = () => {
  const data = fs.existsSync(filePath) ? fs.readFileSync(filePath) : [];
  try {
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const saveUser = users => {
  fs.writeFileSync(filePath, JSON.stringify(users, null, '\t'));
};

const userRoute = app => {
  app
    .route('/users')
    .get((req, res, next) => {
      const users = getUsers();
      res.send({ users });
    })
    .post((req, res) => {
      const users = getUsers();
      users.push(req.body);
      saveUser(users);

      res.status(201).send('OK');
      console.log(req.body);
    })
      .put((req, res) => {
          const users = getUsers();
          saveUser(users.map(user => {
              if (user.id === req.params.id) {
                  return {
                      ...users,
                      ...req.body
                  }
              }
              return user;
          }))
          res.status(201).send('OK');
      })
      .delete((req, res) => {
          const users = getUsers();
          saveUser(users.filter(user => user.id !== req.params.id))
          res.status(204).send('OK');
    })
};

module.exports = userRoute;
