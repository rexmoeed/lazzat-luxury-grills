
import { useParams, useNavigate } from "react-router-dom";
import { blogPosts } from "@/lib/blog-data";
import { Layout } from "@/components/layout/Layout";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find((b) => b.id === id);

  if (!post) {
    return (
      <Layout>
        <div className="container-luxury px-4 py-32 text-center">
          <h1 className="text-3xl font-serif mb-4">Blog Not Found</h1>
          <button onClick={() => navigate(-1)} className="btn-gold px-6 py-2 mt-4">Go Back</button>
        </div>
      </Layout>
    );
  }

  // Extract FAQ section from content
  //FAQ
  const content = post.content;
  const faqIndex = content.indexOf('FAQs');
  let mainContent = content;
  let faqSection = '';
  if (faqIndex !== -1) {
    mainContent = content.slice(0, faqIndex).trim();
    faqSection = content.slice(faqIndex).trim();
  }

  // Parse FAQ Q&A pairs
  let faqs: { q: string; a: string }[] = [];
  if (faqSection) {
    // Remove 'FAQs' heading
    let faqText = faqSection.replace(/^FAQs\n?/, '');
    // Split by question marks followed by newlines
    const qas = faqText.split(/\n(?=[^\n]*\?)/g).map(s => s.trim()).filter(Boolean);
    for (let qa of qas) {
      const [q, ...aParts] = qa.split('?');
      if (aParts.length) {
        faqs.push({
          q: (q + '?').replace(/\n/g, ' ').trim(),
          a: aParts.join('?').replace(/\n/g, ' ').trim(),
        });
      }
    }
  }

  return (
    <Layout>
      <section className="pt-32 pb-8 sm:pt-36 sm:pb-12 md:pt-44 md:pb-16 bg-background">
        <div className="container-luxury px-4 max-w-3xl mx-auto">
          <img src={post.image} alt={post.title} className="w-full rounded-xl mb-8 max-h-96 object-cover" />
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">{post.title}</h1>
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-6">
            <span>{post.date}</span>
            <span>{post.category}</span>
            <span>{post.readTime}</span>
          </div>
          <article className="prose prose-lg prose-invert max-w-none whitespace-pre-line mb-12">
            {mainContent}
          </article>
          {faqs.length > 0 && (
            <div className="mb-12">
              <h2 className="font-serif text-2xl mb-6 text-primary">FAQs</h2>
              <Accordion type="multiple" className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem value={String(i)} key={i}>
                    <AccordionTrigger>{faq.q}</AccordionTrigger>
                    <AccordionContent>{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default BlogDetail;
