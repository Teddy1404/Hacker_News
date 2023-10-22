import { Link } from "react-router-dom";
import "../App.css";
function PostList({ results }) {
  return (
    <ul>
      {results.map((post) => (
        <li key={post.objectID}>
          <Link to={`/post/${post.objectID}`}>
            {/* <div class="card">
              <div class="card1" href="#">
                <p className="font-bold">{post.title}</p>
                <div class="go-corner" href="#">
                  <div class="go-arrow">→</div>
                </div>
              </div>
            </div> */}

            <li className="hover:text-white">{post.title}</li>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default PostList;
