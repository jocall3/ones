import React from 'react';

const AcceptableUsePolicyPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Acceptable Use Policy
          </h1>
          <p className="mt-1 text-sm text-gray-500">Last Updated: {new Date().toLocaleDateString()}</p>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-lg shadow">
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                This Acceptable Use Policy ("Policy") outlines the prohibited uses of the services offered by Magic ("Service"). By using our Service, you agree to this Policy. If you do not agree, you may not use the Service. We may modify this Policy at any time by posting a revised version on our website.
              </p>

              <h2>1. Prohibited Activities</h2>
              <p>
                You may not use, or encourage, promote, facilitate, or instruct others to use, the Service for any illegal, harmful, fraudulent, infringing, or offensive use, or to transmit, store, display, distribute or otherwise make available content that is illegal, harmful, fraudulent, infringing, or offensive. Prohibited activities or content include:
              </p>
              <ul>
                <li>
                  <strong>Illegal, Harmful, or Fraudulent Activities.</strong> Any activities that are illegal, that violate the rights of others, or that may be harmful to others, our operations or reputation, including disseminating, promoting or facilitating child pornography, offering or disseminating fraudulent goods, services, schemes, or promotions, make-money-fast schemes, ponzi and pyramid schemes, phishing, or pharming.
                </li>
                <li>
                  <strong>Infringing Content.</strong> Content that infringes or misappropriates the intellectual property or proprietary rights of others.
                </li>
                <li>
                  <strong>Offensive Content.</strong> Content that is defamatory, obscene, abusive, invasive of privacy, or otherwise objectionable, including content that constitutes child pornography, relates to bestiality, or depicts non-consensual sexual acts.
                </li>
                <li>
                  <strong>Harmful Content.</strong> Content or other computer technology that may damage, interfere with, surreptitiously intercept, or expropriate any system, program, or data, including viruses, Trojan horses, worms, time bombs, or cancelbots.
                </li>
              </ul>

              <h2>2. No Network Abuse</h2>
              <p>
                You may not make network connections to any users, hosts, or networks unless you have permission to communicate with them. Prohibited activities include:
              </p>
              <ul>
                <li>
                  <strong>Monitoring or Crawling.</strong> Monitoring or crawling of a system that impairs or disrupts the system being monitored or crawled.
                </li>
                <li>
                  <strong>Denial of Service (DoS).</strong> Inundating a target with communications requests so the target either cannot respond to legitimate traffic or responds so slowly that it becomes ineffective.
                </li>
                <li>
                  <strong>Intentional Interference.</strong> Interfering with the proper functioning of any system, including any deliberate attempt to overload a system by mail bombing, news bombing, broadcast attacks, or flooding techniques.
                </li>
                <li>
                  <strong>Avoiding System Restrictions.</strong> Using manual or electronic means to avoid any use limitations placed on a system, such as access and storage restrictions.
                </li>
              </ul>

              <h2>3. No E-Mail or Other Message Abuse</h2>
              <p>
                You will not distribute, publish, send, or facilitate the sending of unsolicited mass e-mail or other messages, promotions, advertising, or solicitations (like "spam"), including commercial advertising and informational announcements. You will not alter or obscure mail headers or assume a sender’s identity without the sender’s explicit permission. You will not collect replies to messages sent from another internet service provider if those messages violate this Policy or the acceptable use policy of that other provider.
              </p>

              <h2>4. Our Monitoring and Enforcement</h2>
              <p>
                We reserve the right, but do not assume the obligation, to investigate any violation of this Policy or misuse of the Service. We may:
              </p>
              <ul>
                <li>Investigate violations of this Policy or misuse of the Service;</li>
                <li>
                  Remove, disable access to, or modify any content or resource that violates this Policy or any other agreement we have with you for use of the Service;
                </li>
                <li>
                  Report any activity that we suspect violates any law or regulation to appropriate law enforcement officials, regulators, or other appropriate third parties. Our reporting may include disclosing appropriate customer information. We also may cooperate with appropriate law enforcement agencies, regulators, or other appropriate third parties to help with the investigation and prosecution of illegal conduct by providing network and systems information related to alleged violations of this Policy.
                </li>
              </ul>

              <h2>5. Reporting of Violations of this Policy</h2>
              <p>
                If you become aware of any violation of this Policy, you will immediately notify us and provide us with assistance, as requested, to stop or remedy the violation. To report any violation of this Policy, please contact us at <a href="mailto:abuse@example.com" className="text-blue-600 hover:underline">abuse@example.com</a>.
              </p>

              <h2>6. Consequences of Violation</h2>
              <p>
                If we determine, in our sole discretion, that you have violated this Policy, we may suspend or terminate your use of the Service. We may also block any content, and we may take any other action we deem appropriate, including legal action. We are not liable for any damages of any nature suffered by any customer, user, or any third party resulting in whole or in part from our exercise of our rights under this Policy.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AcceptableUsePolicyPage;