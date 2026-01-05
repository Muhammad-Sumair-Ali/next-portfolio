import Heading from "@/components/reuseable/Heading";

const AboutPage = () => {
  return (
    <div>
      <Heading
        title={"About"}
        description={
          "👋 Hi there! I'm Muhammad Sumair, a Full Stack Developer building production-ready web applications."
        }
      />
      <div className="mx-auto min-h-screen max-w-[1010px] px-0 sm:px-6 lg:px-8">
        {/* Content Section */}
        <div className="space-y-8 rounded-2xl px-4 py-8 sm:p-8">
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-zinc-200">
              Who Am I?
            </h2>
            <p className="text-gray-600 dark:text-zinc-400">
              I'm Muhammad Sumair, a 20-year-old Full Stack Developer from
              Karachi, Pakistan with
              <span className="font-medium text-blue-500"> 2+ years</span> of
              hands-on experience building web applications for clients across the US, Canada, and Pakistan. My passion lies in creating efficient, scalable solutions using modern technologies like
              <span className="font-medium text-green-500"> React</span>,
              <span className="font-medium text-teal-400"> Next.js</span>,
              <span className="font-medium text-purple-500"> Node.js</span>, and
              <span className="font-medium text-yellow-500"> MongoDB</span>. I
              specialize in building production-ready e-commerce platforms, SaaS dashboards, and AI-powered web applications that work beyond the demo phase.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-zinc-200">
              My Journey
            </h2>
            <p className="text-gray-600 dark:text-zinc-400">
              I started my coding journey on{" "}
              <span className="font-medium">June 29, 2023</span>, learning from
              YouTube tutorials. A huge thanks to
              <span className="text-red-400"> Hadi e Learning</span> for making
              coding accessible to me. After completing structured courses, I dove into real-world projects building e-commerce stores, SaaS platforms, and AI-powered applications. Over time, I've delivered 10+ complete projects for international clients with consistent 5-star ratings. I believe that
              <span className="italic">
                {" "}
                consistent practice and real-world projects{" "}
              </span>
              are the key to mastering web development. Today, I work as a Full Stack Developer while taking on select freelance projects.
            </p>
          </section>

          <section>
            <h2 className="mb-5 text-2xl font-semibold text-gray-800 dark:text-zinc-200">
              Professional Experience
            </h2>
            <div className="space-y-6">
              {/* AI Voro */}
              <div className="rounded-lg border border-gray-200 p-6 dark:border-zinc-700">
                <div className="mb-3">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-zinc-200">
                    Full Stack Developer
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-zinc-400">
                    AI Voro, Sindh, Pakistan (Remote)
                  </p>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    August 2025 – Present (5 months)
                  </p>
                </div>
                <ul className="space-y-2 text-gray-600 dark:text-zinc-400">
                  <li className="flex items-start">
                    <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500"></span>
                    Managing complete project lifecycle including frontend UI/UX design, backend API development with Strapi, and deployment.
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500"></span>
                    Implementing SEO optimization and sitemap integration for improved search engine visibility.
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500"></span>
                    Collaborating with senior developers to adopt industry best practices and deliver pixel-perfect, responsive interfaces.
                  </li>
                </ul>
              </div>

              {/* Fiverr Freelance */}
              <div className="rounded-lg border border-gray-200 p-6 dark:border-zinc-700">
                <div className="mb-3">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-zinc-200">
                    Full Stack Developer (Freelance)
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-zinc-400">
                    Fiverr, Karachi, Sindh, Pakistan (Remote)
                  </p>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">
                    August 2024 – Present (1 year 5 months)
                  </p>
                </div>
                <ul className="space-y-2 text-gray-600 dark:text-zinc-400">
                  <li className="flex items-start">
                    <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500"></span>
                    Delivered 10+ complete web applications for international clients (US, Canada, Pakistan) with consistent 5-star ratings.
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500"></span>
                    Built Fecund Lush a complete e-commerce platform for a Canadian footwear business with Stripe payments, admin panel, and Cloudinary integration.
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500"></span>
                    Developed AI KidzTory an AI-powered story generation platform with OpenAI integration, admin dashboard, and user analytics.
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500"></span>
                    Created custom SaaS dashboards, role-based admin panels, and responsive web applications using MERN stack and Next.js.
                  </li>
                </ul>
              </div>

              {/* Silver Concepts */}
              <div className="rounded-lg border border-gray-200 p-6 dark:border-zinc-700">
                <div className="mb-3">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-zinc-200">
                    Junior Full Stack Developer
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-zinc-400">
                    Silver Concepts LLC, Karachi, Sindh, Pakistan (Remote)
                  </p>
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                    May 2025 – June 2025 (2 months)
                  </p>
                </div>
                <ul className="space-y-2 text-gray-600 dark:text-zinc-400">
                  <li className="flex items-start">
                    <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-500"></span>
                    Designed and developed OurPhoneMD Clinic Portal a full-featured admin dashboard for patient and appointment management.
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-500"></span>
                    Implemented secure authentication, role-based access control, and form validation using Zod.
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-500"></span>
                    Built responsive UI/UX with React.js, Redux state management, and modern design patterns.
                  </li>
                </ul>
              </div>

              {/* Junior MERN Stack Developer */}
              <div className="rounded-lg border border-gray-200 p-6 dark:border-zinc-700">
                <div className="mb-3">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-zinc-200">
                    Junior MERN Stack Developer
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-zinc-400">
                    Freelance Project With Senior Developer (Remote)
                  </p>
                  <p className="text-sm font-medium text-orange-600 dark:text-orange-400">
                    January 2025 – March 2025 (3 months)
                  </p>
                </div>
                <ul className="space-y-2 text-gray-600 dark:text-zinc-400">
                  <li className="flex items-start">
                    <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange-500"></span>
                    Worked with a senior Full Stack Developer on enterprise-level MERN stack projects.
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange-500"></span>
                    Converted Figma designs to pixel-perfect React components and built RESTful APIs using Node.js and MongoDB.
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange-500"></span>
                    Learned professional Git workflows, code reviews, and collaborative development practices.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-zinc-200">
              What I Do
            </h2>
            <p className="text-gray-600 dark:text-zinc-400">
              I specialize in developing modern, production-ready web applications using
              <span className="font-medium text-green-500">
                {" "}
                MERN Stack & Next.js
              </span>
              . My expertise includes:
            </p>
            <ul className="mt-2 list-inside list-disc space-y-2 text-gray-600 dark:text-zinc-400">
              <li>⚡ Building full-stack e-commerce platforms with payment integration</li>
              <li>🚀 Creating SaaS dashboards with role-based access and analytics</li>
              <li>🤖 Developing AI-powered applications using OpenAI and modern APIs</li>
              <li>🎨 Designing responsive UI/UX with React, Next.js, and Tailwind CSS</li>
              <li>🔧 Building scalable REST APIs with Node.js, Express.js, and MongoDB</li>
              <li>🔍 SEO optimization and performance tuning for faster load times</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-zinc-200">
              Tech Stack
            </h2>
            <div className="text-gray-600 dark:text-zinc-400">
              <p className="mb-3">Technologies I work with daily:</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <h3 className="mb-2 font-semibold text-gray-800 dark:text-zinc-200">
                    Frontend
                  </h3>
                  <ul className="space-y-1 text-sm">
                    <li>→ React.js & Next.js</li>
                    <li>→ TypeScript & JavaScript</li>
                    <li>→ Tailwind CSS & Shadcn UI</li>
                    <li>→ React Native (Mobile)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-gray-800 dark:text-zinc-200">
                    Backend
                  </h3>
                  <ul className="space-y-1 text-sm">
                    <li>→ Node.js & Express.js</li>
                    <li>→ Nest.js & Strapi CMS</li>
                    <li>→ MongoDB & PostgreSQL</li>
                    <li>→ REST APIs & Authentication</li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-gray-800 dark:text-zinc-200">
                    Tools & Services
                  </h3>
                  <ul className="space-y-1 text-sm">
                    <li>→ Git & GitHub</li>
                    <li>→ Stripe & Payment Gateways</li>
                    <li>→ Cloudinary & Firebase</li>
                    <li>→ OpenAI API & AI Integration</li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-gray-800 dark:text-zinc-200">
                    Practices
                  </h3>
                  <ul className="space-y-1 text-sm">
                    <li>→ Clean Code & Best Practices</li>
                    <li>→ SEO Optimization</li>
                    <li>→ Responsive Design</li>
                    <li>→ State Management (Redux, React Query)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-zinc-200">
              Beyond Code
            </h2>
            <div className="text-gray-600 dark:text-zinc-400">
              When I'm not coding, you'll find me:
              <ul className="mt-2 list-inside list-disc space-y-2">
                <li>🔥 Contributing to open-source projects</li>
                <li>📚 Learning new technologies and best practices</li>
                <li>☕ Experimenting with new coffee brewing techniques</li>
                <li>🎮 Playing games or exploring new tech trends</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-zinc-200">
              Let's Work Together
            </h2>
            <p className="text-gray-600 dark:text-zinc-400">
              Currently open for freelance projects and contract work. Whether you need an e-commerce platform, SaaS dashboard, or custom web application let's build something great together.
            </p>
            <div className="mt-4 space-y-2 text-gray-600 dark:text-zinc-400">
              <p>→ Fiverr: <a href="https://www.fiverr.com/muhammadsumair6" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">muhammadsumairdev</a></p>
              <p>→ WhatsApp: <a href="https://wa.me/923194075607" className="text-green-500 hover:underline" target="_blank" rel="noopener noreferrer">+92 319 4075607</a></p>
              <p>→ Response time: Within 24 hours</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;