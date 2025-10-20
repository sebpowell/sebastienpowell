// "use client";
// import { Box } from "@/components/elements/Box";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogTitle,
// } from "@/components/elements/Dialog";
// import { notFound, useParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import * as DialogPrimitive from "@radix-ui/react-dialog";
// import { motion, Variants } from "motion/react";
// import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
// import { useClickSound } from "@/utils/useClickSound";
// import { Engagement } from "@/lib/work";

// type WorkSampleImageProps = {
//   number: number;
// };

// // const WorkSampleImage = (props: WorkSampleImageProps) => {
// //   const {
// //     work: { title, slug },
// //   } = useWorkSampleContext();

// //   const { number } = props;

// //   return (
// //     <Box className="relative overflow-hidden rounded-2xl bg-black/70">
// //       <Image
// //         src={`/work/${slug}/${number}.webp`}
// //         alt={title}
// //         width={2000}
// //         height={1333}
// //         className="object-cover"
// //         sizes="(max-width: 1024px) 100vw, 1440px"
// //         priority
// //       />
// //     </Box>
// //   );
// // };

// const WorkSampleToolbar = () => {
//   return (
//     <Box className="sticky top-4 z-10 flex justify-end px-4 xl:hidden">
//       <WorkSampleClose />
//     </Box>
//   );
// };

// const WorkSampleClose = () => {
//   const [play] = useClickSound();

//   return (
//     <DialogPrimitive.Close
//       asChild
//       className="inline-flex rounded-full bg-white/20 px-3 py-2 text-right text-sm leading-none text-white backdrop-blur-2xl transition-colors duration-500 hover:bg-white/50 hover:text-black"
//       onClick={() => play()}
//     >
//       <Box as={motion.button} whileTap={{ scale: 0.9 }}>
//         Close
//       </Box>
//     </DialogPrimitive.Close>
//   );
// };

// const WorkSampleDialog = () => {
//   const { slug } = useParams<{ slug: string }>();

//   const router = useRouter();

//   const open = !!slug;

//   // const { engagements } = useAppContext();

//   const [selected, setSelected] = useState<Engagement | null>(null);

//   // useEffect(() => {
//   //   const sample = engagements.find((item) => item.slug === slug);

//   //   if (open && !sample) notFound();

//   //   if (sample) setSelected(sample);
//   // }, [slug, open, engagements]);

//   const handleClose = () => {
//     router.back();
//   };

//   const dialogVariants: Variants = {
//     closed: { opacity: 0, y: 10 },
//     open: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.25, delay: 0.25 },
//     },
//   };

//   if (!selected) return;

//   return (
//     <Dialog open={open} onOpenChange={handleClose}>
//       <DialogContent asChild forceMount>
//         <motion.div
//           variants={dialogVariants}
//           initial="closed"
//           animate="open"
//           exit="closed"
//           className="fixed bottom-0 left-0 z-50 h-screen w-screen overflow-auto bg-neutral-900/95 text-text-body outline-none backdrop-blur-sm dark lg:top-0"
//         >
//           <VisuallyHidden.Root asChild>
//             <DialogTitle>{selected.title}</DialogTitle>
//           </VisuallyHidden.Root>
//           <VisuallyHidden.Root>
//             <DialogDescription>{selected.description}</DialogDescription>
//           </VisuallyHidden.Root>
//           <Box>
//             <Box className="sticky top-8 z-10 hidden justify-end xl:flex">
//               <WorkSampleClose />
//             </Box>
//           </Box>

//           <Box className="w-full p-4 pt-24 lg:p-8 lg:pb-32 lg:pt-32">
//             {/* <WorkSampleContent shots={shots} work={selected} /> */}
//           </Box>
//         </motion.div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export { WorkSampleDialog };
