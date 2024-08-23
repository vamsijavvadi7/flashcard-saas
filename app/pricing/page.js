// components/Pricing.js
'use client';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import getStripe from "../utils/get-stripe";


const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: { origin: 'http://localhost:3000' },
    })
    const checkoutSessionJson = await checkoutSession.json()
  
  
    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })
  
    if (error) {
      console.warn(error.message)
    }
  }
  
const PricingSection = styled.section`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 40px;
  background: #f4f4f4;
  flex-direction: row; /* Arrange cards in a row on larger screens */
  align-items: center;
  overflow-x: auto; /* Allows horizontal scrolling on small screens */
  
  @media (max-width: 768px) {
    flex-direction: column; /* Stack cards vertically on small screens */
    padding: 20px;
  }
`;

const PlanCard = styled.div`
  background: ${({ recommended }) => (recommended ? 'linear-gradient(145deg, #e0f7fa, #b9d6e8)' : 'white')};
  border-radius: 12px;
  box-shadow: ${({ recommended }) => (recommended ? '0 8px 16px rgba(0, 0, 0, 0.2)' : '0 4px 8px rgba(0, 0, 0, 0.1)')};
  text-align: center;
  padding: 40px;
  width: 300px;
  min-height: 450px; /* Increase height for better spacing */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  border: ${({ recommended }) => (recommended ? '3px solid #0070f3' : 'none')};
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: ${({ recommended }) => (recommended ? '0 12px 24px rgba(0, 0, 0, 0.3)' : '0 6px 12px rgba(0, 0, 0, 0.2)')};
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 20px;
  }
`;

const PlanTitle = styled.h2`
  margin: 0;
  font-size: 28px;
  color: #333;
  font-weight: bold;
  text-transform: uppercase;
`;

const PlanPrice = styled.p`
  font-size: 36px;
  color: #333;
  margin: 10px 0;
  font-weight: bold;
`;

const PlanDescription = styled.p`
  color: #666;
  margin: 10px 0;
`;

const PlanFeatures = styled.ul`
  text-align: left;
  color: #666;
  margin: 20px 0;
  padding: 0;
  list-style: none;
`;

const PlanFeature = styled.li`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

const FeatureIcon = styled(FontAwesomeIcon)`
  color: #0070f3;
  margin-right: 10px;
`;

const PlanButton = styled.a`
  display: inline-block;
  background: radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%),
              radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%);
  color: white;
  padding: 12px 24px;
  border-radius: 5px;
  text-decoration: none;
  font-size: 16px;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: #005bb5;
    transform: scale(1.05);
  }
`;

const Pricing = () => {
  return (
    <PricingSection>
      <PlanCard>
        <PlanTitle>Free</PlanTitle>
        <PlanPrice>$0</PlanPrice>
        <PlanDescription>
          Basic features for personal use.
        </PlanDescription>
        <PlanFeatures>
          <PlanFeature>
            <FeatureIcon icon={faCheck} />
            Create and manage 10 flashcards per set
          </PlanFeature>
          <PlanFeature>
            <FeatureIcon icon={faCheck} />
            Plain Text Generation
          </PlanFeature>
        </PlanFeatures>
        <PlanButton href="/flashcards">Current Plan</PlanButton>
      </PlanCard>

      <PlanCard recommended>
        <PlanTitle>Pro</PlanTitle>
        <PlanPrice>$2/month</PlanPrice>
        <PlanDescription>
          Advanced features and premium support.
        </PlanDescription>
        <PlanFeatures>
          <PlanFeature>
            <FeatureIcon icon={faCheck} />
            Create and manage 100 Flashcards per set
          </PlanFeature>
          <PlanFeature>
            <FeatureIcon icon={faCheck} />
            Flashcards Generation Using Plain Text, Pdf, Youtube
          </PlanFeature>
          <PlanFeature>
            <FeatureIcon icon={faCheck} />
            Customer Support
          </PlanFeature>
        </PlanFeatures>
        <PlanButton onClick={handleSubmit} >Join Waiting List</PlanButton>
      </PlanCard>

      <PlanCard>
        <PlanTitle>Premium</PlanTitle>
        <PlanPrice>$4/month</PlanPrice>
        <PlanDescription>
          All features included with priority support.
        </PlanDescription>
        <PlanFeatures>
          <PlanFeature>
            <FeatureIcon icon={faCheck} />
            Create and manage unlimited Flashcards per set
          </PlanFeature>
          <PlanFeature>
            <FeatureIcon icon={faCheck} />
            Flashcards Generation Using Plain Text, Pdf, Youtube
          </PlanFeature>
          <PlanFeature>
            <FeatureIcon icon={faCheck} />
            Priority customer support
          </PlanFeature>
        </PlanFeatures>
        <PlanButton onClick={handleSubmit}>Join Waiting List</PlanButton>
      </PlanCard>
    </PricingSection>
  );
};

export default Pricing;
