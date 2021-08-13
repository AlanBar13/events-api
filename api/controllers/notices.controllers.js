import e from 'express';
import asyncHandler from 'express-async-handler'
import Notices from '../models/notices.model.js'

//@desc LIST ALL NOTICES
//@route GET /api/notices
//@access public
const listNotices = asyncHandler(async (req, res) => {
    const notices = await Notices
        .find({})
        .populate('comments.author', 'name email')

    res.status(200);
    res.send(notices);
});

//@desc GET A NOTICE
//@route GET /api/notices/:id
//@access public
const getNotice = asyncHandler(async (req, res) => {
    const { id } = req.params
    const notice = await Notices.findById(id)
        .populate('comments.author', 'name email')

    if (notice) {
        res.status(200)
        res.send(notice)
    } else {
        res.status(400)
        throw new Error('Invalid id')
    }
})

//@desc ADD A NOTICE
//@route POST /api/notices
//@access private
const addNotice = asyncHandler(async (req, res) => {
    const { title, description, postedAt, type } = req.body
    const { isAdmin } = req.user

    if (!isAdmin) {
        res.status(401)
        throw new Error('Not authorized')
    }

    if (title === "" || type === "") {
        res.status(400)
        throw new Error('Title and type required')
    }

    const newNotice = await Notices.create({
        title,
        description: description || "",
        postedAt: postedAt || new Date(),
        type
    })

    if (newNotice) {
        res.status(201)
        res.send(newNotice)
    } else {
        res.status(400)
        throw new Error('Invalid Data')
    }
})

//@desc DELETE A NOTICE
//@route DELETE /api/notices/:id
//@access private
const deleteNotice = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { isAdmin } = req.user

    if (!isAdmin) {
        res.status(401)
        throw new Error('Not authorized')
    }

    const del = await Notices.findByIdAndDelete(id)

    if (del) {
        res.status(200)
        res.json({ delete: true, id })
    } else {
        res.status(400)
        throw new Error('Invalid Id')
    }
})

//@desc ADD A COMMENT TO A NOTICE
//@route POST /api/notices/:id/comment
//@access private
const addComment = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { comment } = req.body

    const newNotice = await Notices.findByIdAndUpdate(
        id,
        { $push: { comments: comment } },
        { new: true, useFindAndModify: true }
    )
    if (newNotice) {
        res.status(200)
        res.send(newNotice)
    } else {
        res.status(400)
        throw new Error('Invalid data')
    }
})

export { listNotices, getNotice, addNotice, deleteNotice, addComment }