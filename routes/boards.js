const express = require("express")
const Board = require("../schemas/boards");
const authMiddleware = require("./auth-middleware");
const router = express.Router();
const { upload } = require('./upload');

//게시글 생성(로그인시 가능)
router.post('/boards', authMiddleware, upload.single('imgUrl'), async (req, res) => {
    console.log(req.file);
    try {
        const {name} = res.locals.user;
        const {title, content} = req.body;
        const maxBoardId = await Board.findOne().sort("-boardId").exec()
        let boardId = 1
        if (maxBoardId) {
            boardId = maxBoardId.boardId+1
        }
        const createdBoards = await Board.create({boardId, name, title, content});
            res.json({ boards : createdBoards});  
    } catch (err) {
        res.status(400).send({
            errorMessage: "게시글 작성 오류"
        })
    }
});

// 게시글 좋아요 기능
router.put('/boards/:boardId/like', authMiddleware, async (req, res) => {
    try {
        const {name} = res.locals.user;
        // console.log(name);
        const {boardId} = req.params;
        const board = await Board.findOne({ boardId: Number(boardId) });
        // console.log(board);
        if (!board.likes.includes(name)) {
            await board.updateOne({$push: { likes: name }});
            res.status(201).send({
                success: true,
                msg: "좋아요가 추가되었습니다."
            });
        } else { 
            await board.updateOne({ $pull: { likes: name }});
            res.status(201).send({
                success: true,
                msg: "좋아요가 취소되었습니다."
            });
        }
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router