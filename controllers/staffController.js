const applicationService = require('../services/applicationService');

// Display the staff dashboard with adoption applications
function showDashboard(req, res) {
    const applications = applicationService.getAllApplications();

    res.render('staff', { applications: applications });
}

module.exports = { showDashboard };