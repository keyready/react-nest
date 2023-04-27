function generateAccessToken() {
    return Math.random()
        .toString(36).substring(2, 15) + Math.random()
        .toString(36).substring(2, 15);
}
function generateRefreshToken() {
    return Math.random()
        .toString(36).substring(2, 15) + Math.random()
        .toString(36).substring(2, 15);
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
};
