const User = require("../Model/User");
const bcrypt = require("bcrypt");

const UserCTL = {
    getInfo: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findOne({ _id: id });
            console.log(user);
            res.status(200).json({ data: user });
        } catch (error) {
            res.status(500).json({ message: "Có lỗi" });
        }
    },

    changePassword: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const { currentPass, newPass, idUser } = req.body;
            const user = await User.findOne({ _id: idUser });
            if (user) {
                const checkPassword = await bcrypt.compare(currentPass, user.password);
                if (checkPassword) {
                    const hashedPass = await bcrypt.hash(newPass, salt);
                    user.password = hashedPass;
                    await user.save();
                    return res.status(200).json({ message: "Thay đổi thành công" });
                }
                return res.status(400).json({ message: "Mật khẩu hiện tại không đúng" });
            }
            return res.status(400).json({ message: "Không tìm thấy người dùng" });
        } catch (error) {
            res.status(500).json({ message: "Có lỗi" });
        }
    },

    editName: async (req, res) => {
        try {
            const { id, name } = req.body;
            const user = await User.findOne({ _id: id });
            user.name = name;
            await user.save();
            res.status(200).json({ message: "Thay đổi thành công" });
        } catch (error) {
            res.status(500).json({ message: "Có lỗi" });
        }
    },

    editAvatar: async (req, res) => {
        try {
            const imageUrl = req.file.path;
            const avatar = imageUrl.replace(/\\/g, '/');
            const { id } = req.body;
            const user = await User.findOne({ _id: id });
            user.avatar = avatar;
            await user.save();
            res.status(200).json({ message: avatar });
        } catch (error) {
            res.status(500).json({ message: "Có lỗi" });
        }
    }
}

module.exports = UserCTL;