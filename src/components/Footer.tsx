const Footer = () => {
  return (
  <footer className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">📚</span>
              <span className="text-xl font-bold">MyLibrary</span>
            </div>
            <p className="
             max-w-md">
              A modern library management system designed to make book management simple and efficient.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <a href="#" className="block 
               hover:text-white transition-colors">
                About
              </a>
              <a href="#" className="block 
               hover:text-white transition-colors">
                Contact
              </a>
              <a href="#" className="block 
               hover:text-white transition-colors">
                GitHub
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Get in Touch</h3>
            <div className="space-y-2 
            ">
              <p>📧 contact@mylibrary.com</p>
              <p>📱 +1 (555) 123-4567</p>
              <p>📍 123 Library St, Book City</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="
           text-sm">
            © 2024 MyLibrary. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="
             hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="
             hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
