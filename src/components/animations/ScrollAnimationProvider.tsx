"use client";

import {
  ReactNode,
  useRef,
  useEffect,
  useState,
  createContext,
  useContext,
  useCallback,
} from "react";

/* =====================================================
   CONTEXT
===================================================== */

interface ViewportRevealContextType {
  activeIndex: number;
  totalSections: number;
  goToSection: (index: number) => void;
  registerSection: (index: number, element: HTMLElement) => void;
}

const ViewportRevealContext = createContext<ViewportRevealContextType>({
  activeIndex: 0,
  totalSections: 0,
  goToSection: () => {},
  registerSection: () => {},
});

export const useViewportReveal = () => useContext(ViewportRevealContext);

/* =====================================================
   CONTAINER
===================================================== */

interface ViewportRevealContainerProps {
  children: ReactNode;
  className?: string;
}

export const ViewportRevealContainer = ({
  children,
  className = "",
}: ViewportRevealContainerProps) => {
  const [currentScrollY, setCurrentScrollY] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Map<number, HTMLElement>>(new Map());
  const lastScrollTime = useRef(0);

  const childrenArray = Array.isArray(children) ? children : [children];
  const totalSections = childrenArray.length;

  const ANIMATION_DURATION = 800;

  /* =====================================================
     MOBILE DETECTION
  ===================================================== */

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  /* =====================================================
     ACTIVE DOT UPDATE
  ===================================================== */

  const updateActiveIndex = (scrollY: number) => {
    let newIndex = 0;
    sectionRefs.current.forEach((el, index) => {
      const top = el.offsetTop;
      const bottom = top + el.offsetHeight;
      const middle = scrollY + window.innerHeight / 2;
      if (middle >= top && middle < bottom) newIndex = index;
    });
    setActiveIndex(newIndex);
  };

  /* =====================================================
     NAVIGATION
  ===================================================== */

  const goToSection = (index: number) => {
    if (isMobile || isAnimating) return;
    const section = sectionRefs.current.get(index);
    if (!section) return;

    setIsAnimating(true);
    const newY = section.offsetTop;
    setCurrentScrollY(newY);
    updateActiveIndex(newY);

    setTimeout(() => setIsAnimating(false), ANIMATION_DURATION);
  };

  const navigate = useCallback(
    (direction: "up" | "down") => {
      if (isMobile || isAnimating) return;

      const vh = window.innerHeight;
      const max =
        (contentRef.current?.scrollHeight || 0) - vh;

      let newY =
        direction === "down"
          ? Math.min(currentScrollY + vh, max)
          : Math.max(currentScrollY - vh, 0);

      newY = Math.round(newY / vh) * vh;

      if (newY !== currentScrollY) {
        setIsAnimating(true);
        lastScrollTime.current = Date.now();
        setCurrentScrollY(newY);
        updateActiveIndex(newY);
        setTimeout(() => setIsAnimating(false), ANIMATION_DURATION);
      }
    },
    [currentScrollY, isAnimating, isMobile]
  );

  /* =====================================================
     DESKTOP SCROLL HIJACK
  ===================================================== */

  useEffect(() => {
    if (isMobile) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (Date.now() - lastScrollTime.current < ANIMATION_DURATION) return;
      if (Math.abs(e.deltaY) < 10) return;
      navigate(e.deltaY > 0 ? "down" : "up");
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        navigate("down");
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        navigate("up");
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
    };
  }, [navigate, isMobile]);

  /* =====================================================
     REGISTER SECTIONS
  ===================================================== */

  const registerSection = useCallback((index: number, el: HTMLElement) => {
    sectionRefs.current.set(index, el);
  }, []);

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <ViewportRevealContext.Provider
      value={{ activeIndex, totalSections, goToSection, registerSection }}
    >
      <div
        className={`${
          isMobile
            ? "relative overflow-auto"
            : "fixed inset-0 overflow-hidden"
        } bg-background ${className}`}
      >
        <div
          ref={contentRef}
          className="w-full will-change-transform"
          style={
            isMobile
              ? { transform: "none", transition: "none" }
              : {
                  transform: `translateY(-${currentScrollY}px)`,
                  transition: `transform ${ANIMATION_DURATION}ms cubic-bezier(0.33,1,0.68,1)`,
                }
          }
        >
          {childrenArray.map((child, index) => (
            <SectionWrapper key={index} index={index}>
              {child}
            </SectionWrapper>
          ))}
        </div>
      </div>
    </ViewportRevealContext.Provider>
  );
};

/* =====================================================
   SECTION WRAPPER
===================================================== */

const SectionWrapper = ({
  children,
  index,
}: {
  children: ReactNode;
  index: number;
}) => {
  const { registerSection } = useViewportReveal();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) registerSection(index, ref.current);
  }, [index, registerSection]);

  return <div ref={ref}>{children}</div>;
};

/* =====================================================
   SECTION
===================================================== */

export const ViewportSection = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <section className={`min-h-screen ${className}`}>{children}</section>;
};
