import Heading from "@/components/reuseable/Heading";

const About = () => {
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
              I'm Muhammad Sumair, a 20-year-old self-taught Full Stack
              Developer from Pakistan with
              <span className="font-medium text-blue-500"> 1.5+ years</span> of
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
              I started my coding journey on <span className="font-medium">June 29, 2023</span>,
              learning from YouTube tutorials. A huge thanks to
              <span className="text-red-400"> Hadi e Learning</span> and
              <span className="text-green-400"> Chai or Code</span> for making
              coding accessible to me. After that, I completed structured
              courses to sharpen my skills. Over time, I built multiple
              projects, gained real-world experience, and transitioned into a
              professional Full Stack Developer. I believe that
              <span className="italic"> consistent practice and real-world projects </span>
               are the key to mastering web development.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-zinc-200">
              What I Do
            </h2>
            <p className="text-gray-600 dark:text-zinc-400">
              I specialize in developing modern web applications using
              <span className="font-medium text-green-500"> MERN Stack & NextJs</span>.
              My expertise includes:
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

export default About;
