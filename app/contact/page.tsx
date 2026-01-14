'use client'

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-48B8PFD2C7"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-48B8PFD2C7');
</script>
    
import ContactForm from '@/app/components/Forms/ContactForm'

export default function Contact() {
    return (
        <main className="px-6 md:px-24 xl:px-64 mt-28 lg:mt-48 mb-20">
            <h2 className="font-bold font-fractul text-4xl lg:text-5xl mb-5 dark:text-[#F4DFDF]">Contact</h2>
            <ContactForm />
        </main>
    )
}
