import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { BorderGlowCard } from "@/components/interactive/BorderGlowCard";
import { blog } from "@/lib/content";

export const metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <>
      {/* Hero band */}
      <section className="relative overflow-hidden pt-[72px]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(16, 20, 29,0.10) 0%, rgba(16, 20, 29,0) 70%)",
          }}
        />
        <div className="container-x pb-14 pt-20 md:pt-28">
          <Reveal className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <div className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              Blog
            </div>
            <h1 className="mt-6 font-display text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] text-ink md:text-[56px]">
              {blog.h1}
            </h1>
            <p className="mt-5 text-[17px] leading-relaxed text-ink/60 md:text-[19px]">
              {blog.intro}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Posts grid */}
      <section className="pb-16 md:pb-32">
        <div className="container-x">
          <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blog.posts.map((post) => (
              <StaggerItem key={post.slug} className="h-full">
                <BorderGlowCard
                  className="h-full hover:-translate-y-1 transition-transform duration-300"
                  innerClassName="overflow-hidden rounded-card"
                >
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="group flex h-full flex-col"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <span className="text-xs font-medium uppercase tracking-wide text-ink/40">
                        {post.date}
                      </span>
                      <h2 className="mt-2 line-clamp-2 text-lg font-semibold leading-snug tracking-tight text-ink">
                        {post.title}
                      </h2>
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink/60">
                        {post.excerpt}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-medium text-brand transition-transform duration-300 group-hover:gap-2.5">
                        Read more <span aria-hidden>&rarr;</span>
                      </span>
                    </div>
                  </Link>
                </BorderGlowCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
