import { getPayload } from "payload";
import config from "@payload-config";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import CustomRichText from "@/components/payload_rich_text_styling";
import Footer from "@/components/footer";
import Header from "@/components/navbar";
import { getCachedLanguage } from "@/lib/language";
import {
  translateLexicalContentForLanguage,
  translateTextForLanguage,
} from "@/lib/blog-language";

type CoverImage = {
  url: string;
  alt?: string | null;
};

type BlogDoc = {
  id: string;
  slug: string;
  category?: string;
  title: string;
  author?: string | null;
  date?: string | null;
  createdAt: string;
  coverImage?: CoverImage | null;
  content?: unknown;
};

const uiByLang: Record<
  string,
  {
    by: string;
    fallbackAuthor: string;
    backToBlogs: string;
    newsletterTitle: string;
    newsletterPlaceholder: string;
    newsletterSubmit: string;
    recentPosts: string;
  }
> = {
  en: {
    by: "BY",
    fallbackAuthor: "DEVISGON TECH BLOG",
    backToBlogs: "Back to Blogs",
    newsletterTitle: "Join Our Community: Sign Up for Exclusive Newsletter",
    newsletterPlaceholder: "Enter Email",
    newsletterSubmit: "Submit",
    recentPosts: "Recent Posts",
  },
  ur: {
    by: "از",
    fallbackAuthor: "DEVISGON ٹیک بلاگ",
    backToBlogs: "بلاگز پر واپس جائیں",
    newsletterTitle: "ہماری کمیونٹی میں شامل ہوں: خصوصی نیوز لیٹر کے لیے سائن اپ کریں",
    newsletterPlaceholder: "ای میل درج کریں",
    newsletterSubmit: "جمع کریں",
    recentPosts: "حالیہ پوسٹس",
  },
  ar: {
    by: "بواسطة",
    fallbackAuthor: "مدونة DEVISGON التقنية",
    backToBlogs: "العودة إلى المدونات",
    newsletterTitle: "انضم إلى مجتمعنا: اشترك في النشرة الحصرية",
    newsletterPlaceholder: "ادخل البريد الإلكتروني",
    newsletterSubmit: "إرسال",
    recentPosts: "أحدث المقالات",
  },
  zh: {
    by: "作者",
    fallbackAuthor: "DEVISGON 技术博客",
    backToBlogs: "返回博客",
    newsletterTitle: "加入我们的社区：订阅独家新闻简报",
    newsletterPlaceholder: "输入邮箱",
    newsletterSubmit: "提交",
    recentPosts: "最新文章",
  },
  es: {
    by: "POR",
    fallbackAuthor: "BLOG TECNICO DE DEVISGON",
    backToBlogs: "Volver a Blogs",
    newsletterTitle: "Unete a nuestra comunidad: Suscribete al boletin exclusivo",
    newsletterPlaceholder: "Ingresa tu email",
    newsletterSubmit: "Enviar",
    recentPosts: "Publicaciones Recientes",
  },
  de: {
    by: "VON",
    fallbackAuthor: "DEVISGON TECH BLOG",
    backToBlogs: "Zurueck zu den Blogs",
    newsletterTitle: "Werde Teil unserer Community: Exklusiven Newsletter abonnieren",
    newsletterPlaceholder: "E-Mail eingeben",
    newsletterSubmit: "Senden",
    recentPosts: "Neueste Beitraege",
  },
  fr: {
    by: "PAR",
    fallbackAuthor: "BLOG TECH DE DEVISGON",
    backToBlogs: "Retour aux blogs",
    newsletterTitle: "Rejoignez notre communaute: Inscrivez-vous a la newsletter exclusive",
    newsletterPlaceholder: "Entrez votre email",
    newsletterSubmit: "Envoyer",
    recentPosts: "Articles Recents",
  },
};

const dateLocaleByLang: Record<string, string> = {
  en: "en-US",
  ur: "ur-PK",
  ar: "ar",
  zh: "zh-CN",
  es: "es-ES",
  de: "de-DE",
  fr: "fr-FR",
};

function formatBlogDate(lang: string, date?: string | null, createdAt?: string) {
  const locale = dateLocaleByLang[lang] ?? "en-US";
  return new Date(date || createdAt || Date.now()).toLocaleDateString(locale);
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lang = await getCachedLanguage();
  const copy = uiByLang[lang] ?? uiByLang.en;

  const payload = await getPayload({ config });

  const findOneBySlug = async () => {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    return (await (payload as any).find({
      collection: "blogs",
      where: {
        and: [
          { slug: { equals: slug } },
          { status: { equals: "published" } },
        ],
      },
      depth: 1,
      limit: 1,
    })) as { docs: BlogDoc[] };
  };

  const result = await findOneBySlug();
  const blog = result.docs[0] as BlogDoc | undefined;
  if (!blog) return notFound();

  const fetchRecentPosts = async () => {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const result = await (payload as any).find({
      collection: "blogs",
      where: {
        and: [
          { slug: { not_equals: slug } },
          { status: { equals: "published" } },
        ],
      },
      sort: "-createdAt",
      limit: 4,
      depth: 1,
    });

    return result.docs as BlogDoc[];
  };

  const recentPosts = await fetchRecentPosts();

  const translatedBlog: BlogDoc = {
    ...blog,
    title: await translateTextForLanguage(blog.title, lang),
    author: await translateTextForLanguage(blog.author || "", lang),
    content: await translateLexicalContentForLanguage(blog.content, lang),
  };

  const translatedRecentPosts = await Promise.all(
    recentPosts.map(async (post) => ({
      ...post,
      title: await translateTextForLanguage(post.title, lang),
      author: await translateTextForLanguage(post.author || "", lang),
    })),
  );

  return (
    <>
      <Header />

      <div className="w-full bg-background pt-16 pb-12 px-6">
        <header className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center border-b border-gray-200 dark:border-gray-800 pb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-t-primary my-12 leading-tight">
            {translatedBlog.title}
          </h1>
          <div className="flex items-center gap-2 text-sm md:text-base font-bold text-[#402060] dark:text-[#E2C6F8] uppercase tracking-wider">
            <span>
              {copy.by} {translatedBlog.author || copy.fallbackAuthor}
            </span>
            <span className="text-[#8E4EC6]">•</span>
            <span>{formatBlogDate(lang, blog.date, blog.createdAt)}</span>
          </div>
        </header>
      </div>

      <main className="max-w-7xl mx-auto py-12 px-6 font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-12">
          <article className="lg:col-span-2">
            {blog.coverImage && typeof blog.coverImage === "object" && (
              <div className="w-full mb-10 rounded-xl overflow-hidden shadow-sm">
                <Image
                  src={blog.coverImage.url}
                  alt={blog.coverImage.alt || translatedBlog.title}
                  width={1200}
                  height={300}
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="w-full object-cover max-h-[300px]"
                />
              </div>
            )}

            <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
              <CustomRichText content={translatedBlog.content} />
            </div>

            <Link
              href="/blogs"
              className="inline-block p-4 bg-[#402060] hover:-translate-y-2 hover:scale-105 duration-300 dark:bg-[#6F1595] text-white rounded-xl font-medium"
            >
              {copy.backToBlogs}
            </Link>
          </article>

          <aside className="lg:col-span-1 flex flex-col gap-12 pt-4 lg:border-l lg:border-gray-200 dark:lg:border-gray-800 lg:pl-12">
            <div className="bg-[#faf8fc] border border-purple-100 dark:border-gray-800 dark:bg-gray-900/50 p-8 rounded-xl shadow-sm">
              <h3 className="text-[#402060] dark:text-[#E2C6F8] font-bold text-xl mb-4 leading-snug">
                {copy.newsletterTitle}
              </h3>
              <form className="flex flex-col gap-4">
                <input
                  type="email"
                  placeholder={copy.newsletterPlaceholder}
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 text-black  rounded-md bg-white dark:bg-gray-800 outline-none focus:border-[#d966ff] text-sm"
                  required
                />
                <button
                  type="submit"
                  className="w-full md:w-auto self-start bg-[#d966ff] hover:bg-[#c952f2] text-white font-bold py-3 px-8 rounded-md transition duration-300 text-sm tracking-wider uppercase"
                >
                  {copy.newsletterSubmit}
                </button>
              </form>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#402060] dark:text-white mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">
                {copy.recentPosts}
              </h3>
              <div className="flex flex-col gap-8">
                {translatedRecentPosts.map((post) => (
                  <Link
                    href={`/blogs/${post.slug}`}
                    key={post.id}
                    className="flex flex-col group bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-800"
                  >
                    {post.coverImage && typeof post.coverImage === "object" ? (
                      <div className="w-full h-48 overflow-hidden relative">
                        <Image
                          src={post.coverImage.url}
                          alt={post.coverImage.alt || post.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-48 bg-gray-200 dark:bg-gray-800"></div>
                    )}

                    <div className="p-5 flex flex-col flex-grow">
                      <h4 className="text-lg font-bold text-[#402060] dark:text-gray-200 group-hover:text-[#d966ff] dark:group-hover:text-[#e066ff] transition duration-300 line-clamp-2 mb-4">
                        {post.title}
                      </h4>

                      <div className="mt-auto flex items-center justify-between text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        <span className="truncate max-w-[60%]">{post.author || copy.fallbackAuthor}</span>
                        <span>{formatBlogDate(lang, post.date, post.createdAt)}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </>
  );
}
