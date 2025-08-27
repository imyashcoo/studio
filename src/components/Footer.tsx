
import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
    return (
       <footer className="bg-background border-t">
        <div className="container py-12">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                <div className="col-span-2 md:col-span-1">
                     <Link href="/" className="flex items-center gap-2 mb-4">
                        <Image src="/logo.svg" alt="RackUp Logo" width={32} height={32} />
                        <span className="text-xl font-bold">RackUp</span>
                    </Link>
                </div>
                <div>
                    <h4 className="font-semibold mb-4">Company</h4>
                    <ul className="space-y-2 text-muted-foreground">
                        <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
                        <li><Link href="/careers" className="hover:text-primary">Careers</Link></li>
                        <li><Link href="#" className="hover:text-primary">Blog</Link></li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-semibold mb-4">Support</h4>
                    <ul className="space-y-2 text-muted-foreground">
                        <li><Link href="/contact" className="hover:text-primary">Contact Us</Link></li>
                        <li><Link href="/faq" className="hover:text-primary">FAQ</Link></li>
                        <li><Link href="/privacy-policy" className="hover:text-primary">Privacy Policy</Link></li>
                         <li><Link href="/terms-of-service" className="hover:text-primary">Terms of Service</Link></li>
                    </ul>
                </div>
                <div className="col-span-2">
                    <h4 className="font-semibold mb-4">Get the App</h4>
                    <div className="text-sm text-muted-foreground">
                        <p>Coming Soon on</p>
                        <p className="font-medium text-foreground">Google Play &amp; App Store</p>
                    </div>
                </div>
            </div>
            <div className="mt-8 pt-8 border-t flex flex-col sm:flex-row justify-between items-center text-muted-foreground gap-4">
                <p className="text-center sm:text-left">&copy; {new Date().getFullYear()} RackUp Pvt. Ltd. All rights reserved.</p>
                <div className="flex space-x-4">
                    <Link href="#" className="hover:text-primary"><Image src="https://placehold.co/24x24/ffffff/000000.png?text=f" alt="Facebook" width={24} height={24} className="rounded-full" data-ai-hint="facebook icon" /></Link>
                    <Link href="#" className="hover:text-primary"><Image src="https://placehold.co/24x24/ffffff/000000.png?text=t" alt="Twitter" width={24} height={24} className="rounded-full" data-ai-hint="twitter icon" /></Link>
                    <Link href="#" className="hover:text-primary"><Image src="https://placehold.co/24x24/ffffff/000000.png?text=in" alt="LinkedIn" width={24} height={24} className="rounded-full" data-ai-hint="linkedin icon" /></Link>
                    <Link href="#" className="hover:text-primary"><Image src="https://placehold.co/24x24/ffffff/000000.png?text=ig" alt="Instagram" width={24} height={24} className="rounded-full" data-ai-hint="instagram icon" /></Link>
                </div>
            </div>
        </div>
      </footer>
    )
}
