
function index (reg, res) {
    const posts = 'These are posts';
    return res.send(posts);
}

module.exports = {
    index: index
}