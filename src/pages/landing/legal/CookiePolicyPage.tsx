import React from 'react';

const CookiePolicyPage: React.FC = () => {
  return (
    <div className="bg-gray-50 text-gray-800 font-sans leading-relaxed">
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Cookie Policy
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-lg shadow-md space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
            <p>
              Welcome to Magic ("we," "us," or "our"). This Cookie Policy explains how we use cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are, why we use them, and your rights to control our use of them.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">What Are Cookies?</h2>
            <p>
              Cookies are small data files placed on your computer or mobile device when you visit a website. They are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.
            </p>
            <p className="mt-4">
              Cookies set by us are called "first-party cookies." Cookies set by parties other than us are called "third-party cookies." Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why We Use Cookies</h2>
            <p>
              We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies enable us to track and target the interests of our users to enhance their experience.
            </p>
            <div className="mt-6 space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Strictly Necessary Cookies</h3>
                <p className="mt-1 text-gray-600">
                  These are essential for you to browse the website and use its features, such as accessing secure areas of the site.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Performance and Functionality Cookies</h3>
                <p className="mt-1 text-gray-600">
                  These are used to enhance the performance and functionality of our website but are non-essential to their use. However, without these cookies, certain functionality may become unavailable.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Analytics and Customization Cookies</h3>
                <p className="mt-1 text-gray-600">
                  These cookies collect information that is used either in aggregate form to help us understand how our website is being used or how effective our marketing campaigns are, or to help us customize our website for you.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Advertising Cookies</h3>
                <p className="mt-1 text-gray-600">
                  These cookies are used to make advertising messages more relevant to you. They prevent the same ad from continuously reappearing and ensure that ads are properly displayed.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Choices Regarding Cookies</h2>
            <p>
              You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website, though your access to some functionality and areas may be restricted.
            </p>
            <p className="mt-4">
              As the means by which you can refuse cookies through your web browser controls vary from browser to browser, you should visit your browser's help menu for more information.
            </p>
            <p className="mt-4">
              Additionally, most advertising networks offer you a way to opt out of targeted advertising. If you would like to find out more information, please visit{' '}
              <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">http://www.aboutads.info/choices/</a> or{' '}
              <a href="http://www.youronlinechoices.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">http://www.youronlinechoices.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to This Cookie Policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p>
              If you have any questions about our use of cookies or other technologies, please email us at{' '}
              <a href="mailto:legal@magic.com" className="text-blue-600 hover:underline">
                legal@magic.com
              </a>.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default CookiePolicyPage;