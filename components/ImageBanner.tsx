"use client";

import Image from "next/image";
import { motion, MotionConfig } from "framer-motion";

/**
 * A framed photo between sections. Its side margins line up with the content of the sections
 * around it, and only the photo zooms on hover, so the frame never moves under the cursor.
 */
export default function ImageBanner() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="bg-[#100c07]">
        <div className="mx-auto max-w-[104.5rem] px-6 py-8 md:px-10 md:py-10 lg:py-[2.5rem] lg:pl-[3.6875rem] lg:pr-[3.25rem]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="group relative aspect-[4/3] overflow-hidden rounded-[1.25rem] border border-[#d4b283]/75 shadow-[0_0_1.5rem_rgb(232_184_113/0.12)] md:aspect-[16/8] lg:aspect-[2.3/1] lg:rounded-[1.4rem]"
          >
            <Image
              src="/images/banner/steak-dinner.webp"
              alt="Steak with roasted vegetables and a glass of red wine on a candlelit table in The Grove's dining room"
              fill
              unoptimized
              sizes="(min-width: 1024px) 95vw, 100vw"
              className="object-cover object-[96%_65%] transition-transform duration-700 ease-out group-hover:scale-[1.04] md:object-[50%_62%]"
            />
          </motion.div>
        </div>
      </div>
    </MotionConfig>
  );
}
