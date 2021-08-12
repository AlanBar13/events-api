import asyncHandler from 'express-async-handler'
import Notices from '../models/notices.model.js'

//@desc LIST ALL NOTICES
//@route GET /api/notices
//@access public
const listNotices = asyncHandler(async (req, res) => {
    const notices = await Notices
        .find({})
        .populate({
            path: 'author',
            select: '_id name email'
        });

    res.status(200);
    res.send(notices);
});

export { listNotices }