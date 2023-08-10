import defaultAvatar from "../../assets/default_avatar.jpg"
import moment from "moment"


const Comment = ({comment}) => {    
    return(<li className="comment">
        <img className="avatar" src={comment.user.avatar ? comment.user.avatar : defaultAvatar } alt="avatar" />
        <div className="comment-body">
            <div><h2>{`${comment.user.name.first} ${comment.user.name.last}`}</h2> <h3>{moment(comment.createdAt).format("ll")}</h3></div>
            <p>{comment.text}</p>

        </div>
    </li>)
}

export default Comment