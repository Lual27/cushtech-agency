import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Code,
  Camera,
  Globe,
  Menu,
  X,
  Linkedin,
  Instagram,
} from "lucide-react";
import emailjs from "@emailjs/browser";

const galleryImages = [
  "/projects/project1.jpg",
  "/projects/project2.jpg",
  "/projects/project3.jpg",
  "/projects/project4.jpg",
  "/projects/project5.jpg",
  "/projects/project6.jpg",
];

const navLinks = ["home", "about", "services", "gallery", "contact"];
const services = [
  { icon: Code, title: "Web Development" },
  { icon: Globe, title: "Software Solutions" },
  { icon: Camera, title: "Digital Media" },
];

const inputClasses =
  "p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-orange-500";

// Reusable motion section
const Section = ({ id, children, className = "" }) => {
  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={variants}
      transition={{ duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

// Reusable NavLinks component
const NavLinks = ({ onClick }) =>
  navLinks.map((link) => (
    <a
      key={link}
      href={`#${link}`}
      onClick={onClick}
      className="hover:text-orange-500 transition"
    >
      {link.charAt(0).toUpperCase() + link.slice(1)}
    </a>
  ));

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .send(
        "service_t8hb5cs",
        "__ejs-test-mail-service__",
        formData,
        "qcl3o3z3KAgPUtPkW"
      )
      .then(
        () => {
          setStatus("Message sent successfully!");
          setFormData({ name: "", email: "", subject: "", message: "" });
        },
        (error) => {
          setStatus("Failed to send message. Please try again.");
          console.error("EmailJS error:", error);
        }
      );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white scroll-smooth">
      {/* Navbar */}
      <nav className="fixed top-0 w-full flex justify-between items-center px-6 py-4 bg-gray-900/90 backdrop-blur z-50">
        <div className="flex items-center gap-3">
          <img
            src="/cushtech-logo.png"
            alt="CushTech Logo"
            className="h-8 w-8 object-contain"
          />
          <h1 className="text-xl md:text-2xl font-bold">CushTech Agency</h1>
        </div>

        <div className="hidden md:flex space-x-6 text-sm">
          <NavLinks />
        </div>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </button>

        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-gray-900 flex flex-col items-center py-4 space-y-4 md:hidden">
            <NavLinks onClick={() => setMenuOpen(false)} />
          </div>
        )}
      </nav>

      {/* Hero */}
      <Section
        id="home"
        className="h-screen flex flex-col justify-center items-center text-center px-6"
      >
        <h2 className="text-5xl md:text-6xl font-extrabold mb-6">
          Building Digital Experiences
        </h2>
        <p className="max-w-xl text-gray-300 mb-8">
          CushTech Agency delivers modern web solutions, clean design, and
          creative digital products.
        </p>
        <a
          href="#contact"
          className="px-8 py-3 bg-orange-500 text-black rounded-2xl font-medium hover:bg-orange-400 transition"
        >
          Get Started
        </a>
      </Section>

      {/* About */}
      <Section id="about" className="py-20 px-6 md:px-10 max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold mb-10 text-center md:text-left">
          About Us
        </h3>
        <div className="grid md:grid-cols-2 gap-8 text-gray-300">
          <p>
            CushTech Agency is a tech-driven digital agency specializing in web
            development, software solutions, and digital media. We focus on
            creating modern, reliable, and user-centered digital products
            tailored to our clients.
          </p>
          <p>
            Our mission is to help brands grow and stand out in the digital
            space by delivering high-quality solutions that combine creativity,
            technology, and innovation. We aim to provide exceptional value
            through services that empower businesses to achieve their goals.
          </p>
        </div>
      </Section>

      {/* Services */}
      <Section id="services" className="py-20 px-10 max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold mb-12 text-center">Our Services</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className="p-8 bg-gray-800 border border-orange-500 rounded-2xl"
            >
              <s.icon className="mb-4 text-orange-500" />
              <h4 className="font-semibold text-lg">{s.title}</h4>
              <p className="mt-2 text-sm text-gray-300">
                Professional solutions tailored to your business.
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Projects */}
      <Section id="gallery" className="py-20 px-10 max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold mb-12 text-center">
          Client Projects
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="rounded-2xl overflow-hidden border border-gray-700 bg-gray-800"
            >
              <div className="relative h-56 w-full">
                <img
                  src={img}
                  alt={`Project ${i + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" className="py-20 px-6 md:px-10 max-w-3xl mx-auto">
        <h3 className="text-3xl font-bold mb-6 text-center">Contact Us</h3>
        <p className="text-gray-300 mb-8 text-center">
          Let’s build something great together.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {["name", "email", "subject"].map((field) => (
            <input
              key={field}
              type={field === "email" ? "email" : "text"}
              name={field}
              placeholder={`Your ${
                field.charAt(0).toUpperCase() + field.slice(1)
              }`}
              value={formData[field]}
              onChange={handleChange}
              className={inputClasses}
              required
            />
          ))}
          <textarea
            name="message"
            placeholder="Message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className={inputClasses}
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-orange-500 text-black rounded-2xl hover:bg-orange-400 transition"
          >
            Send Message
          </button>
        </form>

        {status && (
          <p
            className={`mt-4 text-center ${
              status.includes("successfully")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {status}
          </p>
        )}

        <div className="mt-10 text-center">
          <a
            href="mailto:info@cushtech.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 border border-orange-500 rounded-2xl hover:bg-gray-700 transition"
          >
            <Mail size={16} /> Email Us Directly
          </a>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-700 mt-20 py-10 px-6 text-gray-300">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h4 className="font-bold mb-2 text-white">CushTech Agency</h4>
            <p>Building digital experiences that empower your business.</p>
          </div>
          <div>
            <h4 className="font-bold mb-2 text-white">Contact Info</h4>
            <p>
              Email:{" "}
              <a
                href="mailto:cushtechagency13@gmail.com"
                className="text-orange-500 hover:underline"
              >
                cushtechagency13@gmail.com
              </a>
            </p>
            <p>
              Phone:{" "}
              <a
                href="tel:+254768296775"
                className="text-orange-500 hover:underline"
              >
                +254 768 296 775
              </a>
            </p>
            <p>Location: Juba, South Sudan</p>
          </div>
          <div>
            <h4 className="font-bold mb-2 text-white">Follow Us</h4>
            <div className="flex justify-center md:justify-start gap-4 mt-2">
              {[X, Linkedin, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-500 hover:text-orange-400 transform hover:scale-110 transition duration-300"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} CushTech Agency. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
