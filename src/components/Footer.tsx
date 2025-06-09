import React from 'react';
import { Linkedin, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>© 2024 Analytics Dashboard. All rights reserved.</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">Designed by</span>
            <a
              href="https://www.linkedin.com/in/md-anamul-haque-shakib/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors group"
            >
              <span className="font-medium">Md Anamul Haque</span>
              <span className="text-xs text-green-600">(CS Engineer & UI/UX Designer)</span>
              <Linkedin size={16} className="text-green-600 group-hover:text-green-700" />
              <ExternalLink size={12} className="text-green-500 group-hover:text-green-600" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;