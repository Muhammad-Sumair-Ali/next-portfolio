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
        <div className="space-y-8 rounded-2xl p-8 ">
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-zinc-200">
              Who Am I?
            </h2>
            <p className="text-gray-600 dark:text-zinc-400">
              I'm Muhammad Sumair, a 19-year-old self-taught Full Stack
              Developer from Pakistan with
              <span className="font-medium text-blue-500"> 1.5+ years</span> of
              hands-on experience in building web applications. My passion lies
              in creating efficient solutions using modern technologies like
              <span className="font-medium text-green-500"> React</span>,
              <span className="font-medium text-purple-500"> Node.js</span>, and
              <span className="font-medium text-yellow-500"> MongoDB</span>.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-zinc-200">
              My Journey
            </h2>
            <p className="text-gray-600 dark:text-zinc-400">
              Started my coding journey in june 29 2023 with YouTube tutorials
              (big thanks to
              <span className="text-red-400"> Hadi e Learning</span> and
              <span className="text-green-400"> Chai or Code</span>!), then
              leveled up through structured bootcamps and live courses. Learned
              that <span className="italic">consistent practice</span>
              beats raw talent every time!
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-zinc-200">
              Beyond Code
            </h2>
            <div className="text-gray-600 dark:text-zinc-400">
              When I'm not debugging, you'll find me:
              <ul className="mt-2 list-inside list-disc space-y-2">
                <li>🔥 Contributing to open-source projects</li>
                <li>📚 Mentoring new developers in community forums</li>
                <li>☕ Experimenting with new coffee brewing techniques</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
