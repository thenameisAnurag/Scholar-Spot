import React from 'react';
import scholarshipImage from '../assets/Logo.png'; // Add an appropriate image here

const About = () => {
  return (
    <div className="px-8 py-16">
      <div className="h-56 bg-sky-300 flex flex-col justify-center items-center mb-10">
        <h1 className="text-5xl font-bold mb-4 text-center">About Us</h1>
        <p className="text-xl text-center max-w-4xl">
          Empowering Students to Achieve Their Dreams with Scholarships and Mentorship.
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <img src={scholarshipImage} alt="Scholarships" className="w-full h-96 object-contain mb-8 rounded-lg" />

        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">Who We Are</h2>
          <p className="text-lg leading-relaxed">
            We are a dedicated team committed to providing the best scholarship information and mentorship opportunities
            to help students unlock their potential. Our platform is designed to assist students from various academic
            backgrounds, whether they're pursuing undergraduate, graduate, or Ph.D. programs, by offering tailored
            scholarship resources and personalized mentorship guidance.
          </p>
          <p className="text-lg leading-relaxed mt-4">
            Our mission is to create an inclusive and supportive environment where every student, regardless of their
            background, can access financial aid and expert guidance to achieve their educational and professional
            goals. By working with experienced mentors and providing up-to-date scholarship information, we aim to
            empower students to make informed decisions and succeed in their academic journeys.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">Our Program</h2>
          <p className="text-lg leading-relaxed">
  
          </p>
          <p className="text-lg leading-relaxed mt-4">
            Through our extensive network of professionals and educators, we help students navigate the complexities of
            scholarship applications, exam preparation, and career development. We believe in fostering a community of
            learners who can benefit from shared experiences and practical insights, ensuring that no student is left
            behind.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">Our Scholarship Database</h2>
          <p className="text-lg leading-relaxed">
            Our extensive scholarship database covers a wide range of opportunities, from government-funded programs to
            private scholarships tailored to specific fields of study. We provide detailed information on eligibility
            criteria, application deadlines, and required documents, making it easier for students to find and apply for
            the scholarships that best suit their needs.
          </p>
          <p className="text-lg leading-relaxed mt-4">
            Our goal is to ensure that students from all walks of life have access to the financial resources they need
            to pursue their education. By offering comprehensive and user-friendly scholarship listings, we hope to
            bridge the gap between students and the opportunities that can transform their futures.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4">Join Us on the Journey</h2>
          <p className="text-lg leading-relaxed">
            We invite you to explore our platform and take advantage of the resources we offer. Whether you're a student
            seeking scholarships, a mentor looking to give back, or an educational institution interested in partnering
            with us, we are here to support your journey. Together, we can create a brighter future for the next
            generation of leaders, innovators, and scholars.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
