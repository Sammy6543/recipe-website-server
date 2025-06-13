const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cloudinary = require('../utils/cloudinary'); // your cloudinary config

// ✅ Ensure 'uploads' folder exists
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// ✅ Disk storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Make sure this matches your actual folder name
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const baseName = path.basename(file.originalname, ext);
        const uniqueName = `${baseName}-${Date.now()}${ext}`;
        cb(null, uniqueName);
    },
});

const upload = multer({ storage });

// ✅ Middleware to upload to Cloudinary
const uploadToCloudinary = async (req, res, next) => {
    if (!req.file) return next();

    const filePath = path.join(__dirname, '..', 'uploads', req.file.filename);

    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'your-folder-name', // optional: set your Cloudinary folder
        });

        // ✅ Delete the local file after successful upload
        fs.unlinkSync(filePath);

        // ✅ Attach Cloudinary URL to request
        req.file.cloudinaryUrl = result.secure_url;
        next();

    } catch (error) {
        console.error('Cloudinary Upload Error:', error);
        return res.status(500).json({ error: 'Cloudinary upload failed' });
    }
};

module.exports = {
    upload,
    uploadToCloudinary,
};
