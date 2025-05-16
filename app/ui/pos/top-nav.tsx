
import Link from 'next/link';
import Image from 'next/image';

export default function TopNav() {
  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/pos" className="text-xl font-bold text-gray-200">
              POS System
            </Link>
          </div>

          {/* Profile Image */}
          <div className="flex items-center">
            <Link
              href="/pos/user-profile"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all"
            >
              <Image
                src="https://6ef1uc7a62.ufs.sh/f/YuAp8ZPhEJz2j1nApx43CReEUsIhVuGHWlZDLzgFYrbyjq4v"
                alt="Profile"
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}