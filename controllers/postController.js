const Validator = require('fastest-validator')
const models = require('../models');
function index(req, res) {
   const posts = models.Post.findAll()
   posts.then(
    result => {
        res.status(200).json(result);
    }
   ).catch(
    error => {
        res.status(500).json({
            message: "Error Occured",
            error: error
        })
    }
   );
}

function save(req, res) {
    const post = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        categoryId: req.body.categoryId,
        userId: req.userData.userId,
    }

    const schema = {
        title: { type: "string", optional: false, max: "100" },
        content: { type: "string", optional: false, max: "100" },
        categoryId: { type: "number", optional: false  }
    }

    const validator = new Validator();
    const validationResponse = validator.validate(post, schema)
    
    if(validationResponse !==  true) {
        return res.status(400).json({
            message: 'Validation Failed',
            errors: validationResponse
        })
    }

    models.Category.findByPk(req.body.categoryId).then(
        result => {
            if(result !== null){
                models.Post.create(post).then(
                    result => {
                        res.status(200).json({
                            message: 'Post created successfully',
                            post: result
                        })
                    }
                ).catch(error => {
                    res.status(500).json({
                        message: 'Error creating post',
                        error: error
                    })
                })
            }else{
                res.status(404).json({
                    message: 'Category Not Found'
                })
            }
        }
    )

}


async function show(req, res){
    const post = req.params.id;
    try {
        const result = await models.Post.findByPk(post);
        if(result){
            res.status(200).json({
                message: 'Post retrieved successfully',
                post: result
            })
            
        }else{
            res.status(404).json({
                message: 'Post Not Found'
            })
        }
       
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving post',
            error: error
        })
    }
}

function update(req, res) {
    const id= req.params.id;
    const updatedPost = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        categoryId: req.body.categoryId
    };
    const  userId = req.userData.userId;
    
    
    const schema = {
        title: { type: "string", optional: false, max: "100" },
        content: { type: "string", optional: false, max: "100" },
        categoryId: { type: "number", optional: false  }
    }

    const validator = new Validator();
    const validationResponse = validator.validate(updatedPost, schema)
    
    if(validationResponse !==  true) {
        return res.status(400).json({
            message: 'Validation Failed',
            errors: validationResponse
        })
    }

    models.Category.findByPk(req.body.categoryId).then(
        result => {
            if(result !== null){
                const post = models.Post.update(updatedPost, {where: {id: id, userId: userId}});
                post.then(
                    result => {
                        res.status(200).json({
                            message: 'Post updated successfully',
                            result: updatedPost
                        })
                    }
                ).catch(
                    error => {
                        res.status(500).json({
                            message: 'Error updating post',
                            error: error
                        })
                    }
                );
            }else{
                res.status(404).json({
                    message: 'Category Not Found'
                })
            }
        }
    )

    
}

async function destroy(req, res) {
    const id = req.params.id;
    const  userId= req.userData.userId;
    try {
        const result = await models.Post.destroy({where: {id: id, userId: userId}});
        res.status(200).json({
            message: 'Post deleted successfully',
            result: result
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting post',
            error: error
        })
    }
} 

// async function save(req, res) {
//     const { title, content, imageUrl, categoryId } = req.body;

//     try {
//         const post = await models.Post.create({
//             title,
//             content,
//             imageUrl,
//             categoryId,
//             userId: 1,
//         });

//         res.status(200).json({
//             message: 'Post created successfully',
//             post,
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: 'Error creating post',
//             error,
//         });
//     }
// }

// module.exports = { index, save };



module.exports = {
    index: index, 
    save: save,
    show: show,
    update: update,
    destroy: destroy
}