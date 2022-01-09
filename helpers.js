const getUserWithEmail = function (email) {
  return pool
    .query("SELECT * FROM users WHERE email = $1", [email])
    .then((result) => result.rows[0])
    .catch((err) => {
      console.log(err.message);
    });
};

const login = function (email, password) {
  return database.getUserWithEmail(email).then((user) => {
    if (password === user.password) {
      return user;
    }
    return null;
  });
};
