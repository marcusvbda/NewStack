const _this = {
    getcsrftoken : (req, res) => {
        let token = req.csrfToken()
        return res.json({ csrfToken: token });
    }
};

module.exports  = _this;