import articles from "../article-content";
import ArticleList from "../ArticlesList";
export default function ArticleListPage(){
    return (
        <>
           <ArticleList  articles={articles}/>
        </>
    );
}