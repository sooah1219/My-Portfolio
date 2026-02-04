import { FaGithub, FaLinkedin } from "react-icons/fa";

export function Footer() {
  return (
    <footer
      id="footer"
      className="w-full flex flex-col items-center justify-center text-center text-sm text-muted-foreground mt-24 pb-8"
    >
      <div className="flex items-center gap-4 mt-2">
        <a
          href="https://github.com/sooah1219"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[25px] text-muted-foreground transition-all duration-200 hover:text-[#6D65FF] hover:-translate-y-[2px]"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/sooahcho1219/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[25px] text-muted-foreground transition-all duration-200 hover:text-[#6D65FF] hover:-translate-y-[2px]"
        >
          <FaLinkedin />
        </a>
      </div>

      <div className="mt-3 h-px w-16 origin-center rounded-full bg-gradient-to-r from-transparent via-[#6D65FF] to-transparent opacity-80 transition-all duration-300 group-hover:w-24" />
    </footer>
  );
}
