import { useEffect, useRef, useState } from 'react';

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}

export function useScrollRevealSequence(options: ScrollRevealOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
  } = options;

  const refs = useRef<(HTMLElement | null)[]>([]);
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set());

  useEffect(() => {
    const elements = refs.current.filter(Boolean) as HTMLElement[];
    if (elements.length === 0) return;

    const observers = elements.map((element, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleIndices(prev => new Set(prev).add(index));
            if (triggerOnce) {
              observer.unobserve(element);
            }
          } else if (!triggerOnce) {
            setVisibleIndices(prev => {
              const newSet = new Set(prev);
              newSet.delete(index);
              return newSet;
            });
          }
        },
        {
          threshold,
          rootMargin,
        }
      );

      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [threshold, rootMargin, triggerOnce]);

  const setRef = (index: number) => (el: HTMLElement | null) => {
    refs.current[index] = el;
  };

  return { setRef, visibleIndices };
}
