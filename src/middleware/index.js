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