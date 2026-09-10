import { useEffect, useRef } from 'react';

/**
 * Custom hook to dynamically update document.title
 * Restores original title on unmount if requested.
 *
 * @param {string} title - The title to set
 * @param {boolean} [retainOnUnmount=false] - Whether to keep the title on unmount
 */
export function useDocumentTitle(title, retainOnUnmount = false) {
  const defaultTitle = useRef(document.title);

  useEffect(() => {
    if (title) {
      document.title = title;
    }

    return () => {
      if (!retainOnUnmount && defaultTitle.current) {
        document.title = defaultTitle.current;
      }
    };
  }, [title, retainOnUnmount]);
}

export default useDocumentTitle;
