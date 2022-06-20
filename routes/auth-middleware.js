const jwt = require("jsonwebtoken");
const User = require("../schemas/users");

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    const [tokenType, tokenValue] = authorization.split(' ');

    if (tokenType !== "Bearer") {
        res.status(401).send({
            errorMessage: "로그인이 필요합니다.",
        });
        return;
    }

    try {
        const { userId } = jwt.verify(tokenValue, "my-key");
        // 토큰에 담긴 userId로 해당 사용자가 실제로 존재하는지 확인
        User.findOne({userId}).then((user) => {
            res.locals.user = user;
            next();
        });
    } catch (error) {
        res.status(401).send({
            errorMessage: "로그인이 필요합니다",
        });
        return;
    }
};