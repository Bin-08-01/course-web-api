const Banner = require('../Model/Banner');

const BannerCTL = {
    getPublic: async (req, res) => {
        try {
            const banners = await Banner.find({ status: true });
            return res.status(200).json({ data: banners });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Có lỗi" });
        }
    },

    getAll: async (req, res) => {
        try {
            const banners = await Banner.find();
            return res.status(200).json({ data: banners });
        }catch(err){
            res.status(500).json({ message: "Có lỗi" });
        }
    },

    addBanner: async (req, res) => {
        try {
            const imageUrl = req.file.path;
            const urlImg = imageUrl.replace(/\\/g, '/');

            const { name, status, extenalLink } = req.body;
            if (!name || !urlImg) {
                return res.status(401).json({ message: "Tiêu đề và ảnh không được để trống" });
            }
            await new Banner({
                name, status, urlImg, extenalLink
            }).save();
            return res.status(200).json({ message: "Đã thêm banner" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Có lỗi" });
        }
    },

    detail: async (req, res) => {
        try {
            const banner = await Banner.findOneById(req.body.id);
            if (banner) {
                return res.status(200).json({ data: banner });
            }
            return res.status(403).json({ message: "Banner không tồn tại" });
        } catch (error) {
            res.status(500).json({ message: "Có lỗi" });
        }
    },

    edit: async (req, res) => {
        try {
            const { id, name, status, urlImg, extenalLink } = req.body; 
            if (!name || !urlImg) {
                return res.status(401).json({ message: "Tên và ảnh không được để trống" });
            }
            const banner = await Banner.findOne({ _id: id });
            if (!banner) {
                return res.status(401).json({ message: "Banner này không tồn tại" });
            }
            banner = { name, status, urlImg, extenalLink }
            await banner.save();
            return res.status(200).json({ message: "Thay đổi banner thành công" });
        } catch (error) {
            return res.status(500).json({ message: "Có lỗi xảy ra" });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.body;
            await Banner.findByIdAndDelete(id);
            res.status(200).json({ message: "Đã xoá banner thành công" });
        } catch (error) {
            res.status(500).json({ message: "Có lỗi đã xảy ra" });
        }
    }
}

module.exports = BannerCTL;