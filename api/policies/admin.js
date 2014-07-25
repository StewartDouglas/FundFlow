/**
 * Allow any authenticated user.
 */
module.exports = function (req, res, ok) {

  // User is allowed, proceed to controller
  if (req.session.User && req.session.User.admin) {
    console.log('User is admin');
    return ok();
  }

  // User is not allowed
  else {
    console.log('User not admin');
  	var requireAdminError = [{name: 'requireAdminError', message: 'You must be an admin.'}]
		req.session.flash = {
			err: requireAdminError
		}
    res.redirect('/session/new');
    return;
  }
};