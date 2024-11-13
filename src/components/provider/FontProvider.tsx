import { createContext, useContext, useEffect, useState } from 'react';

type Font = 'small' | 'medium' | 'large';

type FontProviderProps = {
  children: React.ReactNode;
  defaultFont?: Font;
  storageKey?: string;
};

type FontProviderState = {
  font: Font;
  setFont: (font: Font) => void;
};

const initialState: FontProviderState = {
  font: 'medium',
  setFont: () => null,
};

const FontProviderContext = createContext<FontProviderState>(initialState);

export function FontProvider({ children, defaultFont = 'medium', storageKey = 'fontSize', ...props }: FontProviderProps) {
  const [font, setFont] = useState<Font>(() => (localStorage.getItem(storageKey) as Font) || defaultFont);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('small', 'medium', 'large');
    root.classList.add(font);
  }, [font]);

  const value = {
    font,
    setFont: (font: Font) => {
      localStorage.setItem(storageKey, font);
      setFont(font);
    },
  };

  return (
    <FontProviderContext.Provider {...props} value={value}>
      {children}
    </FontProviderContext.Provider>
  );
}

export const useFont = () => {
  const context = useContext(FontProviderContext);

  if (context === undefined) throw new Error('useFont must be used within a FontProvider');

  return context;
};
