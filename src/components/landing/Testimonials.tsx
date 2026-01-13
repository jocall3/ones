import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

interface Testimonial {
  id: number;
  name: string;
  company?: string;
  title?: string;
  testimonial: string;
  imageUrl?: string;
}

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: 1,
      name: 'Alice Smith',
      company: 'Acme Corp',
      title: 'CEO',
      testimonial:
        'Magic-Main has revolutionized our financial operations. The platform is intuitive and the support is exceptional.',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Bob Johnson',
      company: 'Beta Inc',
      title: 'CFO',
      testimonial:
        'The AI-powered features have saved us countless hours and improved our decision-making process.',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      name: 'Charlie Brown',
      company: 'Gamma Ltd',
      title: 'Head of Finance',
      testimonial:
        'The integration capabilities are seamless, and the platform is incredibly secure.',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 4,
      name: 'David Lee',
      company: 'Delta Group',
      title: 'CTO',
      testimonial:
        'The platform is incredibly secure and the support is exceptional.',
      imageUrl: 'https://via.placeholder.com/150',
    },
  ]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const slidesToShow = isMobile ? 1 : isTablet ? 2 : 3;
  const [isCarousel, setIsCarousel] = useState(!isMobile);

  useEffect(() => {
    setIsCarousel(!isMobile);
  }, [isMobile]);

  const handleNext = () => {
    setCurrentSlide((prevSlide) =>
      Math.min(prevSlide + 1, testimonials.length - slidesToShow)
    );
  };

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => Math.max(prevSlide - 1, 0));
  };

  const renderCarousel = () => (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <div
        style={{
          display: 'flex',
          transition: 'transform 0.5s ease-in-out',
          transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)`,
          width: `${100 * (testimonials.length / slidesToShow)}%`,
        }}
      >
        {testimonials.map((testimonial) => (
          <Card
            key={testimonial.id}
            sx={{
              width: `calc(100% / ${slidesToShow})`,
              marginRight: theme.spacing(2),
              marginBottom: theme.spacing(2),
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: theme.spacing(2),
              boxSizing: 'border-box',
            }}
          >
            <CardContent>
              <Typography variant="body1" paragraph>
                {testimonial.testimonial}
              </Typography>
              <Typography variant="subtitle2" fontWeight="bold">
                {testimonial.name}
              </Typography>
              {testimonial.title && (
                <Typography variant="caption" color="textSecondary">
                  {testimonial.title}
                </Typography>
              )}
              {testimonial.company && (
                <Typography variant="caption" color="textSecondary">
                  {testimonial.company}
                </Typography>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      {testimonials.length > slidesToShow && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            padding: theme.spacing(1),
          }}
        >
          <IconButton
            onClick={handlePrev}
            disabled={currentSlide === 0}
            sx={{
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            <ChevronLeft />
          </IconButton>
          <IconButton
            onClick={handleNext}
            disabled={currentSlide >= testimonials.length - slidesToShow}
            sx={{
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            <ChevronRight />
          </IconButton>
        </div>
      )}
    </div>
  );

  const renderGrid = () => (
    <Grid container spacing={2}>
      {testimonials.map((testimonial) => (
        <Grid item xs={12} sm={isTablet ? 6 : 4} key={testimonial.id}>
          <Card sx={{ padding: theme.spacing(2) }}>
            <CardContent>
              <Typography variant="body1" paragraph>
                {testimonial.testimonial}
              </Typography>
              <Typography variant="subtitle2" fontWeight="bold">
                {testimonial.name}
              </Typography>
              {testimonial.title && (
                <Typography variant="caption" color="textSecondary">
                  {testimonial.title}
                </Typography>
              )}
              {testimonial.company && (
                <Typography variant="caption" color="textSecondary">
                  {testimonial.company}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <div style={{ padding: theme.spacing(4, 2) }}>
      <Typography variant="h4" align="center" gutterBottom>
        What Our Customers Say
      </Typography>
      {isCarousel ? renderCarousel() : renderGrid()}
    </div>
  );
};

export default Testimonials;