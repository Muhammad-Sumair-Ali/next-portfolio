import Heading from "@/components/reuseable/Heading";

const AboutPage = () => {
  return (
    <div>
      <Heading
        title={"About"}
        description={
          "👋 Hi there! I'm Muhammad Sumair, a web developer who loves building websites."
        }
      />
      <div className="mx-auto min-h-screen max-w-[1010px] px-4 sm:px-6 lg:px-8">
        {/* Content Section */}
        <div className="space-y-8 rounded-2xl p-8">
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-zinc-200">
              Who Am I?
            </h2>
            <p className="text-gray-600 dark:text-zinc-400">
              I'm Muhammad Sumair, a 20-year-old Full Stack Developer from
              Pakistan with
              <span className="font-medium text-blue-500"> 2+ years</span> of
              hands-on experience in building web applications. My passion lies
              in creating efficient solutions using modern technologies like
              <span className="font-medium text-green-500"> React</span>,
              <span className="font-medium text-teal-400"> Next </span>,
              <span className="font-medium text-purple-500"> Node.js</span>, and
              <span className="font-medium text-yellow-500"> MongoDB</span>. I
              specialize in building scalable web applications, APIs, and
              responsive user interfaces.
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
              coding accessible to me. After that, I completed structured
              courses to sharpen my skills. Over time, I built multiple
              projects, gained real-world experience, and transitioned into a
              professional Full Stack Developer. I believe that
              <span className="italic">
                {" "}
                consistent practice and real-world projects{" "}
              </span>
              are the key to mastering web development.
            </p>
          </section>

          <section>
            <h2 className="mb-5 text-2xl font-semibold text-gray-800 dark:text-zinc-200">
              Professional Experience
            </h2>
            <div className="space-y-6">
              {/* Junior Full Stack Developer */}
              <div className="rounded-lg border border-gray-200 p-6 dark:border-zinc-700">
                <div className="mb-3">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-zinc-200">
                    Junior Full Stack Developer
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-zinc-400">
                    Silver Concepts LLC, Karachi, Sindh, Pakistan (Remote)
                  </p>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    May 2025 – Present (2 months)
                  </p>
                </div>
                <ul className="space-y-2 text-gray-600 dark:text-zinc-400">
                  <li className="flex items-start">
                    <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500"></span>
                    Developed and maintained a full-stack SaaS application using
                    Next.js (frontend) and NestJS (backend).
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500"></span>
                    Built scalable RESTful APIs and backend services using
                    NestJS and Prisma ORM with PostgreSQL.
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500"></span>
                    Created responsive, modern UIs using Next.js and Tailwind
                    CSS to deliver smooth user experiences.
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
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">
                    February 2025 – Present (3 months)
                  </p>
                </div>
                <ul className="space-y-2 text-gray-600 dark:text-zinc-400">
                  <li className="flex items-start">
                    <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500"></span>
                    Contributed to a MERN stack web application, developing
                    front-end components with React.js and backend services with
                    Node.js and Express.js.
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500"></span>
                    Worked remotely in a collaborative team environment,
                    managing tasks via Git and ensuring timely project delivery.
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500"></span>
                    Designed and developed responsive UI components using
                    React.js and Shadcn UI.
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
              I specialize in developing modern web applications using
              <span className="font-medium text-green-500">
                {" "}
                MERN Stack & NextJs
              </span>
              . My expertise includes:
            </p>
            <ul className="mt-2 list-inside list-disc space-y-2 text-gray-600 dark:text-zinc-400">
              <li>⚡ Building full-stack web applications</li>
              <li>🚀 Creating optimized and scalable APIs</li>
              <li>🎨 Developing responsive UI/UX with modern frameworks</li>
              <li>🔍 Debugging and optimizing code for performance</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-zinc-200">
              Beyond Code
            </h2>
            <div className="text-gray-600 dark:text-zinc-400">
              When I'm not coding, you'll find me:
              <ul className="mt-2 list-inside list-disc space-y-2">
                <li>🔥 Contributing to open-source projects</li>
                <li>☕ Experimenting with new coffee brewing techniques</li>
                <li>🎮 Playing games or exploring new technologies</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
