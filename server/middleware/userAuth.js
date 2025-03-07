import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    const { token } = req.cookies;// Get the token from the cookies

    if (!token) {
        return res.json({ success: false, message: 'Not Authorised.Login Again' })
    }
    try {

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecode.id) {
            req.body.userId = tokenDecode.id

        } else {
            return res.json({ success: false, message: 'Not Authorised.Login Again' });
        }

        next();

    } catch (error) {
        res.json({ succcess: false, message: error.message });
    }

}

export default userAuth;