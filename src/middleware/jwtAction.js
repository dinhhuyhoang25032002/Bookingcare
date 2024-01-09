import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import _ from 'lodash'

let createJWT = (payload) => {
    let key = process.env.ACCEPT_PRIVATE_KEY;
    let token = null;
    try {
        token = jwt.sign(payload, key, { expiresIn: 60 * 60 }, { algorithm: 'RS256' });
    } catch (err) {
        console.log(err)
    }
    return token;
}

let verifyToken = (token) => {
    let key = process.env.ACCEPT_PRIVATE_KEY;
    let decoded = null;
    try {
        decoded = jwt.verify(token, key);

    } catch (e) {
        console.log(e);
    }
    return decoded;
}

let checkJwtAndCookieFromClient = (req, res, next) => {
    let cookie = req.cookies;
    if (cookie && !_.isEmpty(cookie.jwt)) {
        let token = cookie.jwt;
        let decoded = verifyToken(token)
        if (decoded) {
            req.user = decoded
            next()
        }
        else {
            return res.status(401).json({
                errCode: 401,
                errMessage: `You do'nt have access to this data !`,
                data: {}
            })
        }
    }
    else {
        return res.status(401).json({
            errCode: 401,
            errMessage: `You do'nt have access to this data !`,
            data: {}
        })
    }
}

let checkPermissionUser = (req, res, next) => {
    if (req.user) {
        let email = req.user.email
        let roleID = req.user.roleID
      //  console.log('hoang check data: ', email, roleID)

    } else {
        return res.status(401).json({
            errCode: 401,
            errMessage: 'Not authenticated the user!',
            data:{}
        })
    }
}

module.exports = {
    createJWT, verifyToken, checkJwtAndCookieFromClient,
    checkPermissionUser
}