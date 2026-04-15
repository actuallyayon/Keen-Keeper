import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary-footer text-white/80 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">KeenKeeper</h2>
        <p className="max-w-xl mx-auto text-sm text-white/60 mb-8 leading-relaxed">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>
        
        <div className="flex flex-col items-center gap-6">
          <span className="text-xs uppercase tracking-[0.2em] font-medium text-white/40">Social Links</span>
          <div className="flex gap-4">
            {[
              { id: 'instagram', icon: '/Keen-Keeper/assets/instagram.png' },
              { id: 'facebook', icon: '/Keen-Keeper/assets/facebook.png' },
              { id: 'twitter', icon: '/Keen-Keeper/assets/twitter.png' },
            ].map((social) => (
              <a
                key={social.id}
                href="#"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Image
                  src={social.icon}
                  alt={social.id}
                  width={20}
                  height={20}
                />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] md:text-xs">
          <p>© 2026 KeenKeeper. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
