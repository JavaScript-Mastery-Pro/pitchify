import Link from "next/link";
import Image from "next/image";
import { Bookmark } from "lucide-react";

import { Author, Startup } from "@/sanity/types";
import { cn, formatDate } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export type StartupCardType = Omit<Startup, "author"> & { author?: Author };

const StartupCard = ({ post }: { post: StartupCardType }) => {
  return (
    <li className="startup-card">
      <div className="flex-between">
        <p className="startup-card_date">{formatDate(post._createdAt)}</p>
        <Bookmark className="size-6 text-black" />
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${post.author?._id!}`}>
            <p className="text-16-medium line-clamp-1">{post.author?.name}</p>
          </Link>
          <h3 className="text-26-semibold line-clamp-1">{post.title}</h3>
        </div>
        <Link href={`/user/${post.author?._id}`}>
          <Image
            src={post.author?.image!}
            alt="placeholder"
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>

      <p className="startup-card_desc">{post.description}</p>

      <img src={post.image} alt="placeholder" className="startup-card_img" />

      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${post.category?.toLowerCase()}`}>
          <p className="text-16-medium">{post.category}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${post._id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export const StartupCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((_, index: number) => (
      <li key={cn("skeleton", index)}>
        <Skeleton className="startup-card_skeleton" />
      </li>
    ))}
  </>
);

export default StartupCard;
