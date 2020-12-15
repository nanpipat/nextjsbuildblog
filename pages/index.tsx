import Head from 'next/head'
import { getHeapCodeStatistics } from 'v8'
import styles from '../styles/Home.module.scss'
import Link from 'next/link'
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../public/theme'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import moment from 'moment'

const { BLOG_URL, CONTENT_API_KEY } = process.env

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#fff"
  },
  hero: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80')`,
    height: "500px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "4rem",
    [theme.breakpoints.down("sm")]: {
      height: 300,
      fontSize: "3em"
    }
  },
  blogsContainer: {
    paddingTop: theme.spacing(3)
  },
  blogTitle: {
    fontWeight: 800,
    paddingBottom: theme.spacing(3)
  },
  card: {
    maxWidth: "100%",
  },
  media: {
    height: 240
  },
  cardActions: {
    display: "flex",
    margin: "0 10px",
    justifyContent: "space-between"
  },
  author: {
    display: "flex"
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "center"
  }
}));

type Post = {
  title: string
  slug: string
  custom_excerpt: string
  url: string
  feature_image: string
  published_at: string
  primary_author: {
    name: string
    profile_image: string
  }

}


async function getPosts() {
  //curl "https://demo.ghost.io/ghost/api/v3/content/posts/?key=22444f78447824223cefc48062"
  const res = await fetch(`${BLOG_URL}/ghost/api/v3/content/posts/?key=${CONTENT_API_KEY}&include=tags,authors`
  ).then((res) => res.json())

  const posts = res.posts
  // console.log(posts, "dasdsadasd")
  return posts
}

export const getStaticProps = async ({ params }) => {
  const posts = await getPosts()
  return {
    props: { posts }
  }
}


const Home: React.FC<{ posts: Post[] }> = (props) => {

  const { posts } = props
  const classes = useStyles();
  return (
    <div className="App">
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <Typography variant="h6" color="primary" >
            Blog
          </Typography>
        </Toolbar>
      </AppBar>
      <Box className={classes.hero}>
        <Box>Nanpipat Blog</Box>
      </Box>
      <Container maxWidth="lg" className={classes.blogsContainer}>
        <Typography variant="h4" className={classes.blogTitle} >
          Articles
          </Typography>
        <Grid container spacing={3}>
          {posts.map((post, index) => {
            return <Grid item xs={12} sm={6} md={4}>
              
                <Card className={classes.card}>
                <Link href="/post/[slug]" as={`/post/${post.slug}`}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={post.feature_image}
                      title={post.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {post.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {post.custom_excerpt}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  </Link>
                  <CardActions className={classes.cardActions}>
                    <Box className={classes.author}>
                      <Avatar src={post.primary_author.profile_image} />
                      <Box ml={2}>
                        <Typography variant="subtitle2" component="p">
                          {post.primary_author.name}
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary" component="p">
                          {moment(post.published_at).format('LL')}
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <BookmarkBorderIcon />
                    </Box>
                  </CardActions>
                </Card>

              

            </Grid>
          })}

        </Grid>
      </Container>
      {/* <h1>Hello to my Blog :)</h1>
        <ul>
          {posts.map((post, index) => {
            return <li key={post.slug}>
              <Link href="/post/[slug]" as={`/post/${post.slug}`}>
                <a>{post.title}</a>
              </Link>
            </li>
          })}
        </ul> */}
    </div>
  )
}

export default Home
