import { Link } from "react-router-dom";
export default function ArticleList({articles}){
    return (
        <>
        {
            articles.map(a=> (
            <Link to={'/articles/'+a.name} key={a.name}>
            <h3>{ a.title }</h3>
            <p>{ a.content[0].substring(0, 150) }</p>
            </Link>
           ))
        }
        </>
    );
}