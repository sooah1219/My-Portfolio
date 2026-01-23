// // "use client";

// // import { Card } from "@/components/ui/card";
// // import Script from "next/script";
// // import type { JSX } from "react";

// // declare global {
// //   interface Window {
// //     GitHubCalendar?: (
// //       selector: string,
// //       username: string,
// //       options?: { responsive?: boolean }
// //     ) => void;
// //   }
// // }

// // const username = "sooah1219";

// // export default function GitHubCalendarSection(): JSX.Element {
// //   return (
// //     <section className="w-full flex justify-center mt-10 px-4">
// //       <div className="max-w-6xl w-full">
// //         <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
// //           Activity
// //         </p>
// //         <h2 className="text-xl font-bold mb-3">GitHub Calendar</h2>

// //         <Card className="p-4 md:p-5 rounded-2xl border border-border/70 bg-card/80 shadow-sm overflow-x-auto">
// //           <Script
// //             src="https://unpkg.com/github-calendar@latest/dist/github-calendar.min.js"
// //             strategy="afterInteractive"
// //             onLoad={() => {
// //               if (window.GitHubCalendar) {
// //                 window.GitHubCalendar(".calendar", username, {
// //                   responsive: true,
// //                 });
// //               }
// //             }}
// //           />

// //           <link
// //             rel="stylesheet"
// //             href="https://unpkg.com/github-calendar@latest/dist/github-calendar-responsive.css"
// //           />

// //           <div className="flex justify-end mb-2">
// //             <a
// //               href={`https://github.com/${username}`}
// //               target="_blank"
// //               rel="noopener noreferrer"
// //               className="
// //                 font-dm
// //                 text-xs text-muted-foreground
// //                 transition-all
// //                 hover:font-semibold
// //                 hover:text-[#6D65FF]
// //                 hover:underline
// //                 cursor-pointer
// //               "
// //             >
// //               @{username}
// //               <span className="ml-1 text-xs">↗</span>
// //             </a>
// //           </div>

// //           <div className="calendar github-calendar w-full max-w-[960px] mx-auto text-[12px] text-muted-foreground">
// //             Loading GitHub activity…
// //           </div>
// //         </Card>
// //       </div>
// //     </section>
// //   );
// // }

// "use client";

// import { Card } from "@/components/ui/card";
// import Script from "next/script";
// import type { JSX } from "react";

// declare global {
//   interface Window {
//     GitHubCalendar?: (
//       selector: string,
//       username: string,
//       options?: { responsive?: boolean }
//     ) => void;
//   }
// }

// const username = "sooah1219";

// export default function GitHubCalendarSection(): JSX.Element {
//   return (
//     <section className="w-full flex justify-center mt-10 px-4">
//       <div className="max-w-6xl w-full overflow-hidden">
//         <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
//           Activity
//         </p>
//         <h2 className="text-xl font-bold mb-3">GitHub Calendar</h2>

//         <Card
//           className="
//             p-4 md:p-5 rounded-2xl
//             border border-border/70 bg-card/80 shadow-sm
//             overflow-hidden
//           "
//         >
//           <Script
//             src="https://unpkg.com/github-calendar@latest/dist/github-calendar.min.js"
//             strategy="afterInteractive"
//             onLoad={() => {
//               if (window.GitHubCalendar) {
//                 window.GitHubCalendar(".calendar", username, {
//                   responsive: true,
//                 });
//               }
//             }}
//           />

//           <link
//             rel="stylesheet"
//             href="https://unpkg.com/github-calendar@latest/dist/github-calendar-responsive.css"
//           />

//           <div className="flex justify-end mb-2">
//             <a
//               href={`https://github.com/${username}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="
//                 font-dm
//                 text-xs text-muted-foreground
//                 transition-all
//                 hover:font-semibold
//                 hover:text-[#6D65FF]
//                 hover:underline
//                 cursor-pointer
//               "
//             >
//               @{username}
//               <span className="ml-1 text-xs">↗</span>
//             </a>
//           </div>

//           <div
//             className="
//               calendar github-calendar
//               w-full
//               mx-auto
//               text-[10px] sm:text-[12px]
//               text-muted-foreground
//             "
//           >
//             Loading GitHub activity…
//           </div>
//         </Card>
//       </div>
//     </section>
//   );
// }

"use client";

import { Card } from "@/components/ui/card";
import Script from "next/script";
import type { JSX } from "react";

declare global {
  interface Window {
    GitHubCalendar?: (
      selector: string,
      username: string,
      options?: { responsive?: boolean }
    ) => void;
  }
}

const username = "sooah1219";

export default function GitHubCalendarSection(): JSX.Element {
  return (
    <section className="w-full flex justify-center mt-10 px-4">
      <div className="max-w-6xl w-full">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          Activity
        </p>
        <h2 className="text-xl font-bold mb-3">GitHub Calendar</h2>

        <Card
          className="
            p-4 md:p-5 rounded-2xl
            border border-border/70 bg-card/80 shadow-sm
          "
        >
          <Script
            src="https://unpkg.com/github-calendar@latest/dist/github-calendar.min.js"
            strategy="afterInteractive"
            onLoad={() => {
              if (window.GitHubCalendar) {
                window.GitHubCalendar(".calendar", username, {
                  responsive: true,
                });
              }
            }}
          />

          <link
            rel="stylesheet"
            href="https://unpkg.com/github-calendar@latest/dist/github-calendar-responsive.css"
          />

          <div className="flex justify-end mb-2">
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="
                font-dm 
                text-xs text-muted-foreground
                transition-all
                hover:font-semibold
                hover:text-[#6D65FF]
                hover:underline
                cursor-pointer
              "
            >
              @{username}
              <span className="ml-1 text-xs">↗</span>
            </a>
          </div>

          {/* 👇 여기 새 wrapper 추가 */}
          <div className="calendar-wrapper">
            <div
              className="
                calendar github-calendar
                w-full
                mx-auto
                text-[10px] sm:text-[12px]
                text-muted-foreground
              "
            >
              Loading GitHub activity…
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
