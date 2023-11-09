
const getUserRole = async (req, res, usersCollection) => {
    const email = req.params.email;
    if (req.decoded.email != email) {
        return res.status(401).send({ message: "unauthorized access" });
    }

    const query = { email: email };
    const user = await usersCollection.find(query).toArray();
    if (user?.length > 0) {
        const result = await { role: user[0]?.role };
        res.send(result);
    }
}

module.exports = getUserRole;