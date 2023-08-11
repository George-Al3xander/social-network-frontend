import { useState, useContext } from "react";
import Comment from "../comments/Comment"
import CreateCommentForm from "./CreateCommentForm";



const Comments = ({comments, post, setComments}) => {    
    
    return(
        <ul className="comments">
                <CreateCommentForm setComments={setComments} post={post} />           
                {comments.length > 0 ?
                 <>
                    <h1>All comments</h1>
                    {comments.slice(0).reverse().map((comment) => {
                        return <Comment comment={comment} />
                    })}
                </> : null}
        </ul>
    )
}

export default Comments