import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../../styles/Home.module.scss'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const { BLOG_URL, CONTENT_API_KEY } = process.env

const useStyles = makeStyles((theme) => ({
    appBar: {
        backgroundColor: "#fff"
    }
}))



async function getPost(slug: string) {
    const res = await fetch(`${BLOG_URL}/ghost/api/v3/content/posts/slug/${slug}?key=${CONTENT_API_KEY}&fields=title,slug,html`
    ).then((res) => res.json())

    const posts = res.posts
    return posts[0]
}

export const getStaticProps = async ({ params }) => {
    const post = await getPost(params.slug)
    return {
        props: { post }
    }
}

export const getStaticPaths = () => {

    return {
        paths: [],
        fallback: true
    }
}

type Post = {
    title: string
    slug: string
    html: string
}

const Post: React.FC<{ post: Post }> = props => {
    console.log(props)

    const { post } = props
    const router = useRouter()
    const classes = useStyles();

    if (router.isFallback) {
        return <h1>Loading....</h1>
    }

    return (
        <>
            <AppBar className={classes.appBar} position="static">
                <Toolbar>
                    <Typography variant="h6" color="primary" >
                        Blog
          </Typography>
                </Toolbar>
            </AppBar>
            <div className={styles.container}>
                <p className={styles.goback}>
                    <Link href="/">
                        <a>Go back</a>
                    </Link>
                </p>
                <h1>{post.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: post.html }}></div>

            </div>
        </>

    )
}

export default Post