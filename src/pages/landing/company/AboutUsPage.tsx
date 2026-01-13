import React from 'react';
import styled from 'styled-components';

const AboutUsPageContainer = styled.div`
  padding: 2rem;
  font-family: sans-serif;
  line-height: 1.6;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const Heading = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  color: #555;
`;

const TeamSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const TeamMemberCard = styled.div`
  width: 200px;
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 8px;
  text-align: center;
`;

const TeamMemberImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0.5rem;
`;

const TeamMemberName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.25rem;
  color: #333;
`;

const TeamMemberTitle = styled.p`
  font-size: 0.9rem;
  color: #777;
`;

const AboutUsPage: React.FC = () => {
  return (
    <AboutUsPageContainer>
      <Section>
        <Heading>Our Mission</Heading>
        <Paragraph>
          To empower individuals and businesses with innovative financial solutions,
          fostering growth and prosperity through cutting-edge technology and
          unwavering commitment to our clients' success.
        </Paragraph>
      </Section>

      <Section>
        <Heading>Our Vision</Heading>
        <Paragraph>
          To be the leading global provider of seamless, secure, and intelligent
          financial services, transforming the way people manage and interact with
          their finances in a rapidly evolving digital landscape.
        </Paragraph>
      </Section>

      <Section>
        <Heading>Meet the Team</Heading>
        <TeamSection>
          <TeamMemberCard>
            <TeamMemberImage src="https://via.placeholder.com/100" alt="John Doe" />
            <TeamMemberName>John Doe</TeamMemberName>
            <TeamMemberTitle>CEO</TeamMemberTitle>
          </TeamMemberCard>

          <TeamMemberCard>
            <TeamMemberImage src="https://via.placeholder.com/100" alt="Jane Smith" />
            <TeamMemberName>Jane Smith</TeamMemberName>
            <TeamMemberTitle>CTO</TeamMemberTitle>
          </TeamMemberCard>

          <TeamMemberCard>
            <TeamMemberImage src="https://via.placeholder.com/100" alt="Peter Jones" />
            <TeamMemberName>Peter Jones</TeamMemberName>
            <TeamMemberTitle>Head of Marketing</TeamMemberTitle>
          </TeamMemberCard>

          <TeamMemberCard>
            <TeamMemberImage src="https://via.placeholder.com/100" alt="Alice Brown" />
            <TeamMemberName>Alice Brown</TeamMemberName>
            <TeamMemberTitle>Lead Developer</TeamMemberTitle>
          </TeamMemberCard>
        </TeamSection>
      </Section>

      <Section>
        <Heading>Our Values</Heading>
        <Paragraph>
          Integrity, Innovation, Customer Focus, Collaboration, and Excellence.
          These values guide our decisions and actions, ensuring we deliver the
          highest quality service and build lasting relationships with our clients.
        </Paragraph>
      </Section>
    </AboutUsPageContainer>
  );
};

export default AboutUsPage;