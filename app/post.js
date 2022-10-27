import { Router } from "express";
import { pool } from "../utils/db.js";
const postRouter = Router();

// postRouter.get("/", async (req, res) => {}

postRouter.get("/", async (req, res) => {
  const test = await pool.query("select * from post");
  console.log(test);
  return res.json({ data: test.rows });
});

///________________posts/:postId___________________________________
postRouter.get("/:id", async (req, res) => {
  const postId = req.params.id;

  let query = "select * from post where post_id = $1";
  let values = [postId];

  const result = await pool.query(query, values);

  return res.json({
    data: result.rows,
  });
});

///________________post__________________________________
postRouter.post("/", async (req, res) => {
  const newPost = {
    ...req.body,
    created_at: new Date(),
    updated_at: new Date(),
  };

  await pool.query(
    `insert into post ( title, content, category_id,url,created_at,
      updated_at)
      values ($1, $2, $3, $4 ,$5,$6)`,
    [
      newPost.title,
      newPost.content,
      newPost.category_id,
      newPost.url,
      newPost.created_at,
      newPost.updated_at,
    ]
  );

  return res.json({
    message: "Blog post has been created successfully",
  });
});
///________________update____________________________________________
postRouter.put("/:id", async (req, res) => {
  const updatedPost = {
    ...req.body,
    updated_at: new Date(),
  };
  const postId = req.params.id;

  await pool.query(
    `update post set  title = $1 , content  =$2, 
    category_id = $3 ,url = $4, updated_at = $5   where post_id =  $6`,
    [
      updatedPost.title,
      updatedPost.content,
      updatedPost.category_id,
      updatedPost.url,
      updatedPost.updated_at,
      postId,
    ]
  );

  return res.json({
    message: `Post ${postId} has been updated.`,
  });
});
//________________delete____________________________________________

postRouter.delete("/:id", async (req, res) => {
  const postId = req.params.id;

  await pool.query(`delete from post where post_id = $1`, [postId]);

  return res.json({
    message: `Post ${postId} has been deleted.`,
  });
});

export default postRouter;
