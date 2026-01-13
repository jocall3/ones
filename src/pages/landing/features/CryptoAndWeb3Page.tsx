import React from 'react';
import { Card, Button, Typography, Grid, Box } from '@mui/material';
import { styled } from '@mui/system';

const CryptoAndWeb3Page = () => {

    const FeatureCard = styled(Card)(({ theme }) => ({
        padding: theme.spacing(3),
        textAlign: 'center',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    }));

    const StyledButton = styled(Button)(({ theme }) => ({
        marginTop: theme.spacing(2),
    }));

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom align="center">
                Explore the World of Crypto and Web3
            </Typography>
            <Typography variant="body1" paragraph align="center">
                Dive into the decentralized future with our comprehensive crypto and Web3 integrations.
                Manage your wallets, explore DeFi opportunities, and discover unique NFTs all in one place.
            </Typography>

            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <FeatureCard>
                        <Typography variant="h6">Wallet Management</Typography>
                        <Typography variant="body2">
                            Securely manage your crypto assets with our integrated wallet solutions.
                            Supports multiple blockchains and tokens.
                        </Typography>
                        <StyledButton variant="contained" color="primary">
                            Learn More
                        </StyledButton>
                    </FeatureCard>
                </Grid>

                <Grid item xs={12} md={4}>
                    <FeatureCard>
                        <Typography variant="h6">DeFi Opportunities</Typography>
                        <Typography variant="body2">
                            Explore decentralized finance (DeFi) opportunities and earn rewards through staking,
                            yield farming, and more.
                        </Typography>
                        <StyledButton variant="contained" color="primary">
                            Discover DeFi
                        </StyledButton>
                    </FeatureCard>
                </Grid>

                <Grid item xs={12} md={4}>
                    <FeatureCard>
                        <Typography variant="h6">NFT Marketplace</Typography>
                        <Typography variant="body2">
                            Discover and collect unique non-fungible tokens (NFTs) in our integrated marketplace.
                            Buy, sell, and showcase your digital assets.
                        </Typography>
                        <StyledButton variant="contained" color="primary">
                            Explore NFTs
                        </StyledButton>
                    </FeatureCard>
                </Grid>
            </Grid>

            <Box mt={5} textAlign="center">
                <Typography variant="h5" gutterBottom>
                    Ready to Get Started?
                </Typography>
                <Typography variant="body1" paragraph>
                    Join our community and unlock the potential of crypto and Web3.
                </Typography>
                <Button variant="contained" color="secondary">
                    Sign Up Now
                </Button>
            </Box>
        </Box>
    );
};

export default CryptoAndWeb3Page;