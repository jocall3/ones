import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Avatar, Grid, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    RedditShareButton,
} from 'react-share';
import {
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    RedditIcon,
} from 'react-share';

// Styled Components
const AuthorBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
}));

const AuthorAvatar = styled(Avatar)(({ theme }) => ({
    marginRight: theme.spacing(2),
}));

const SocialShareContainer = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(2),
}));

// Mock Blog Post Data (Replace with actual data fetching)
const mockBlogPost = {
    id: '1',
    title: 'The Future of Finance with AI',
    content: `
        ## Introduction
        Artificial intelligence is rapidly transforming the financial landscape. From algorithmic trading to fraud detection, AI is revolutionizing how financial institutions operate and how individuals manage their finances.

        ## AI in Trading
        AI-powered trading algorithms can analyze vast amounts of market data in real-time, identifying patterns and executing trades with speed and precision. This leads to increased efficiency and potentially higher returns.

        ## AI in Fraud Detection
        AI algorithms can detect fraudulent activities by analyzing transaction patterns and identifying anomalies. This helps financial institutions protect their customers and prevent financial losses.

        ## AI in Personal Finance
        AI-powered personal finance tools can help individuals manage their budgets, track their spending, and make informed investment decisions. These tools provide personalized financial advice and recommendations.

        ## Conclusion
        AI is poised to play an increasingly important role in the future of finance. As AI technology continues to evolve, we can expect to see even more innovative applications that transform the financial industry.
    `,
    author: {
        name: 'Jane Doe',
        avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
        bio: 'Financial Analyst and AI Enthusiast',
    },
    datePublished: '2024-01-26',
};

const BlogPostPage: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();

    // In a real application, you would fetch the blog post data based on the postId
    // For this example, we're using mock data
    const blogPost = mockBlogPost;

    if (!blogPost) {
        return (
            <Container>
                <Typography variant="h4">Blog Post Not Found</Typography>
            </Container>
        );
    }

    const shareUrl = window.location.href; // Or construct the URL dynamically

    return (
        <Container>
            <Typography variant="h2" gutterBottom>
                {blogPost.title}
            </Typography>
            <AuthorBox>
                <AuthorAvatar alt={blogPost.author.name} src={blogPost.author.avatarUrl} />
                <Box>
                    <Typography variant="subtitle1">{blogPost.author.name}</Typography>
                    <Typography variant="body2">{blogPost.author.bio}</Typography>
                    <Typography variant="caption">Published: {new Date(blogPost.datePublished).toLocaleDateString()}</Typography>
                </Box>
            </AuthorBox>
            <Typography variant="body1" component="div">
                {/*  dangerouslySetInnerHTML is used here for demonstration purposes.
                    In a real application, you should sanitize the HTML content to prevent XSS attacks.
                    Consider using a library like DOMPurify.
                */}
                <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
            </Typography>

            <SocialShareContainer>
                <FacebookShareButton url={shareUrl} quote={blogPost.title}>
                    <FacebookIcon size={32} round />
                </FacebookShareButton>
                <TwitterShareButton url={shareUrl} title={blogPost.title}>
                    <TwitterIcon size={32} round />
                </TwitterShareButton>
                <LinkedinShareButton url={shareUrl} title={blogPost.title} summary={blogPost.content} source={window.location.origin}>
                    <LinkedinIcon size={32} round />
                </LinkedinShareButton>
                <RedditShareButton url={shareUrl} title={blogPost.title}>
                    <RedditIcon size={32} round />
                </RedditShareButton>
            </SocialShareContainer>
        </Container>
    );
};

export default BlogPostPage;