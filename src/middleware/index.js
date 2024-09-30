exports.setHeaders = (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Accept", "application/json");

  // Website you wish to allow to connect
  res.setHeader(
    "Access-Control-Allow-Origin", 
    "http://127.0.0.1:3000"
  );
  res.s
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "content-type,x-requested-with"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader(
    "Access-Control-Allow-Credentials", 
    true
  );

  next();
}


exports.isAuthenticated = (req, res, next) => {
  try {
    // if the user is currently logged in, they can continue to the next controller
    if (req.isAuthenticated()) {
      next();
      } else {
    // otherwise they are redirected to the login page    
      res.redirect('/login');
    }

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

exports.isNotAuthenticated = (req, res, next) => {
  try {
    // this middleware should only really be used on the login route
    //if the user is logged in then we dont want them to log in again so we redirect them to a 'logged in' landing page
    if (req.isAuthenticated()) {
      res.redirect('/test/loggedin');
    } else {
    // otherwise they can continue to the log in page.  
      next();
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

exports.gotHere = (req, res, next) => {
  try {
    console.log("** middleware got here **");
    next()
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}