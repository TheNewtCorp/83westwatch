import React from 'react';
import { motion } from 'framer-motion';
import { pageTransitionProps } from '../App'; // Import shared transition props

// Inline SVG Icons
const EmailIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" />
  </svg>
);

const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.053 1.805.248 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.168.422.363 1.057.413 2.228.058 1.265.07 1.646.07 4.85s-.012 3.584-.07 4.849c-.053 1.17-.248 1.805-.413 2.227-.217.562-.477.96-.896 1.382-.42.419-.819.679-1.381.896-.422.168-1.057.363-2.228.413-1.265.058-1.646.07-4.85.07s-3.584-.012-4.849-.07c-1.17-.053-1.805-.248-2.227-.413-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.819-.896-1.381-.168-.422-.363-1.057-.413-2.228-.058-1.265-.07-1.646-.07-4.85s.012-3.584.07-4.849c.053-1.17.248-1.805.413-2.227.217-.562.477.96.896-1.382.42-.419.819-.679-1.381-.896C5.363 2.41 6.002 2.217 7.172 2.163 8.416 2.106 8.796 2.093 12 2.093m0-2.162C8.618 0 8.327.013 7.053.072 2.695.296.296 2.695.072 7.053.013 8.327 0 8.618 0 12s.013 3.673.072 4.947c.224 4.358 2.623 6.757 6.981 6.981C8.327 23.987 8.618 24 12 24s3.673-.013 4.947-.072c4.358-.224 6.757-2.623 6.981-6.981C23.987 15.673 24 15.382 24 12s-.013-3.673-.072-4.947C23.704.296 21.305.296 16.947.072 15.673.013 15.382 0 12 0z"/>
    <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8z"/>
    <circle cx="18.406" cy="5.594" r="1.438"/>
  </svg>
);

const YouTubeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.411 0 5.253 0 12s.488 8.589 4.385 8.816c3.6.245 11.626.246 15.23 0C23.512 20.589 24 18.747 24 12s-.488-8.589-4.385-8.816zM9.75 15.562V8.438L15.021 12 9.75 15.562z"/>
  </svg>
);


const ContactPage: React.FC = () => {
  const contactItemBase = "flex items-center space-x-4 p-4 bg-[#3B2620]/50 hover:bg-[#3B2620]/80 rounded-lg transition-colors duration-200";
  const iconBase = "w-8 h-8 text-[#B49857]";
  const linkTextBase = "text-lg text-[#E3C9A5] group-hover:text-[#C19765] transition-colors";

  return (
    <motion.div
      {...pageTransitionProps}
      className="max-w-3xl mx-auto p-6 md:p-10 bg-[#181818] shadow-2xl rounded-lg my-10 min-h-[60vh] flex flex-col justify-center"
    >
      <h1 className="text-4xl font-['Georgia',_serif] text-[#B49857] text-center mb-8">Get In Touch</h1>
      <p className="text-xl text-[#D3C3A6] text-center mb-12">
        We're here to assist you with any inquiries about our collection, selling your watch, or any other questions you may have.
      </p>

      <div className="space-y-6">
        {/* Email Contact */}
        <a href="mailto:contact@83westwatches.com" className={`group ${contactItemBase}`}>
          <EmailIcon className={iconBase} />
          <div>
            <h3 className="text-xl font-semibold text-[#B49857]">Email Us</h3>
            <p className={linkTextBase}>contact@83westwatches.com</p>
          </div>
        </a>

        {/* Social Media Section */}
        <div className="pt-6">
          <h2 className="text-2xl font-['Georgia',_serif] text-[#D3C3A6] text-center mb-6">Connect With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a 
              href="https://instagram.com/83westwatches" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`group ${contactItemBase}`}
            >
              <InstagramIcon className={iconBase} />
              <div>
                <h3 className="text-xl font-semibold text-[#B49857]">Instagram</h3>
                <p className={linkTextBase}>Follow @83westwatches</p>
              </div>
            </a>
            <a 
              href="https://youtube.com/c/83westwatches" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`group ${contactItemBase}`}
            >
              <YouTubeIcon className={iconBase} />
              <div>
                <h3 className="text-xl font-semibold text-[#B49857]">YouTube</h3>
                <p className={linkTextBase}>Subscribe to our Channel</p>
              </div>
            </a>
          </div>
        </div>
      </div>
      <footer className="mt-12 pt-8 border-t border-[#515052]/50 text-center">
        <p className="text-sm text-[#515052]">We look forward to hearing from you.</p>
      </footer>
    </motion.div>
  );
};

export default ContactPage;
