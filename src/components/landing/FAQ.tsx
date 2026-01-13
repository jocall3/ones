import React, { useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const faqData: FAQItem[] = [
    {
      question: 'What is this platform?',
      answer: 'This platform is designed to revolutionize the way you manage your finances, offering a suite of tools powered by AI and advanced analytics.',
    },
    {
      question: 'How secure is my data?',
      answer: 'We employ state-of-the-art security measures, including encryption and multi-factor authentication, to ensure your data is always protected.',
    },
    {
      question: 'Can I integrate my existing bank accounts?',
      answer: 'Yes, our platform supports integration with a wide range of banks and financial institutions, allowing you to consolidate your financial information in one place.',
    },
    {
      question: 'What kind of AI features are available?',
      answer: 'We offer AI-powered financial forecasting, personalized investment recommendations, and automated compliance monitoring, among other features.',
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes, we offer a free trial period so you can explore the platform and see how it can benefit you before committing to a subscription.',
    },
    {
      question: 'How do I get support?',
      answer: 'Our support team is available 24/7 via email, phone, and live chat. We also have an extensive knowledge base with articles and tutorials.',
    },
  ];

  return (
    <div className="container py-12">
      <h2 className="text-3xl font-semibold text-center mb-8">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqData.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="font-medium text-lg">{item.question}</AccordionTrigger>
            <AccordionContent>
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQ;