const bcrypt = require('bcrypt');

// Verify staff login credentials
async function verifyStaff(username, password) {
    const staffUsername = process.env.STAFF_USERNAME;
    const storedHash = process.env.STAFF_PASSWORD_HASH;

    if (!staffUsername || !storedHash) {
        throw new Error('Staff login is not configured.');
    }

    if (typeof username !== 'string' ||
        typeof password !== 'string') {
        return false;
    }

    if (username !== staffUsername) {
        return false;
    }

    return await bcrypt.compare(password, storedHash);
}

module.exports = { verifyStaff };
