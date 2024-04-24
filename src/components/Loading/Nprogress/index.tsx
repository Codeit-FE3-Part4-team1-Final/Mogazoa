'use client';

/* eslint-disable no-restricted-globals */
import { useEffect } from 'react';
import NProgress from 'nprogress';

type PushStateInput = [
  data: unknown,
  unused: string,
  url?: string | URL | null | undefined,
];

export default function ProgressBar() {
  const HEIGHT = '3px';
  const COLOR = '#0978B3';

  const styles = (
    <style>
      {`
        #nprogress {
          pointer-events: none;
        }

        #nprogress .bar {
          position: fixed;
          z-index: 99999;
          width: 100%;
          height: ${typeof HEIGHT === `string` ? HEIGHT : `${HEIGHT}px`};
          top: 0;
          left: 0;
          background: ${COLOR};
        }

        #nprogress .peg {
          position: absolute;
          display: block;
          width: 100px;
          height: 100%;
          right: 0px;
          opacity: 1.0;
          box-shadow: 0 0 10px ${COLOR}, 0 0 5px ${COLOR};
          -webkit-transform: rotate(3deg) translate(0px, -4px);
              -ms-transform: rotate(3deg) translate(0px, -4px);
                  transform: rotate(3deg) translate(0px, -4px);
        }
    `}
    </style>
  );

  useEffect(() => {
    NProgress.configure({ showSpinner: false });

    const handleClick = (event: MouseEvent) => {
      const targetUrl = (event.currentTarget as HTMLAnchorElement).href;
      const currentUrl = location.href;
      if (targetUrl !== currentUrl) {
        NProgress.start();
      }
    };

    const handlechange: MutationCallback = () => {
      const elements = document.querySelectorAll('a');
      elements.forEach((value) => value.addEventListener('click', handleClick));
    };

    const observer = new MutationObserver(handlechange);
    observer.observe(document, { childList: true, subtree: true });

    window.history.pushState = new Proxy(window.history.pushState, {
      apply: (target, thisArg, argArray: PushStateInput) => {
        NProgress.done();
        return target.apply(thisArg, argArray);
      },
    });
  });

  return styles;
}
