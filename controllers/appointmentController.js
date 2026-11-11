exports.getAppointmentForm = (req, res) => {
    const selectedLocation = req.query.location || '';
    res.render('appointment', { selectedLocation });
};

exports.createAppointment = (req, res) => {
    const { name, email, appointmentDate, location, notes } = req.body;
    
    // Log appointment details including location
    console.log(`New Appointment booked by ${name} for ${appointmentDate} at ${location}`);

    // Redirect back to home
    res.redirect('/');
};