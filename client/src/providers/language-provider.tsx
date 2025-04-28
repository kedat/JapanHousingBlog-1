import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Language = 'en' | 'ja' | 'vi';

type LanguageProviderProps = {
  children: ReactNode;
  defaultLanguage?: Language;
  storageKey?: string;
};

type LanguageProviderState = {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: Record<string, string>;
  t: (key: string) => string;
};

const initialState: LanguageProviderState = {
  language: 'en',
  setLanguage: () => null,
  translations: {},
  t: (key: string) => key,
};

export const LanguageProviderContext = createContext<LanguageProviderState>(initialState);

// Dictionary of translations for all supported languages
const allTranslations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    'nav.home': 'Home',
    'nav.articles': 'Articles',
    'nav.about': 'About',
    'nav.login': 'Login',
    'nav.logout': 'Logout',
    'search.placeholder': 'Search...',
    // Footer
    'footer.about': 'About Us',
    'footer.articles': 'Articles',
    'footer.categories': 'Categories',
    'footer.copyright': '© 2025 Japan Housing. All rights reserved.',
    // Auth Page
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.username': 'Username',
    'auth.password': 'Password',
    'auth.email': 'Email',
    'auth.name': 'Full Name', 
    'auth.confirmPassword': 'Confirm Password',
    // Home Page
    'home.hero.title': 'Discover Japanese Housing',
    'home.hero.subtitle': 'Explore the elegance and minimalism of Japanese architecture',
    'home.featured': 'Featured Articles',
    'home.latest': 'Latest Articles',
    'home.categories': 'Categories',
    'home.loadMore': 'Load More',
    // Common
    'readMore': 'Read More',
    'readingTime': 'min read',
    'by': 'by',
    'relatedArticles': 'Related Articles',
  },
  ja: {
    // Header
    'nav.home': 'ホーム',
    'nav.articles': '記事',
    'nav.about': '概要',
    'nav.login': 'ログイン',
    'nav.logout': 'ログアウト',
    'search.placeholder': '検索...',
    // Footer
    'footer.about': '会社概要',
    'footer.articles': '記事一覧',
    'footer.categories': 'カテゴリー',
    'footer.copyright': '© 2025 ジャパンハウジング. 全著作権所有。',
    // Auth Page
    'auth.login': 'ログイン',
    'auth.register': '登録',
    'auth.username': 'ユーザー名',
    'auth.password': 'パスワード',
    'auth.email': 'メールアドレス',
    'auth.name': '氏名', 
    'auth.confirmPassword': 'パスワード確認',
    // Home Page
    'home.hero.title': '日本の住宅を発見',
    'home.hero.subtitle': '日本建築の優雅さとミニマリズムを探る',
    'home.featured': '注目記事',
    'home.latest': '最新記事',
    'home.categories': 'カテゴリー',
    'home.loadMore': 'もっと読み込む',
    // Common
    'readMore': '続きを読む',
    'readingTime': '分で読める',
    'by': '著者:',
    'relatedArticles': '関連記事',
  },
  vi: {
    // Header
    'nav.home': 'Trang Chủ',
    'nav.articles': 'Bài Viết',
    'nav.about': 'Giới Thiệu',
    'nav.login': 'Đăng Nhập',
    'nav.logout': 'Đăng Xuất',
    'search.placeholder': 'Tìm kiếm...',
    // Footer
    'footer.about': 'Về Chúng Tôi',
    'footer.articles': 'Bài Viết',
    'footer.categories': 'Danh Mục',
    'footer.copyright': '© 2025 Japan Housing. Bảo lưu mọi quyền.',
    // Auth Page
    'auth.login': 'Đăng Nhập',
    'auth.register': 'Đăng Ký',
    'auth.username': 'Tên Đăng Nhập',
    'auth.password': 'Mật Khẩu',
    'auth.email': 'Email',
    'auth.name': 'Họ Tên', 
    'auth.confirmPassword': 'Xác Nhận Mật Khẩu',
    // Home Page
    'home.hero.title': 'Khám Phá Nhà Ở Nhật Bản',
    'home.hero.subtitle': 'Tìm hiểu về sự thanh lịch và tối giản của kiến trúc Nhật Bản',
    'home.featured': 'Bài Viết Nổi Bật',
    'home.latest': 'Bài Viết Mới Nhất',
    'home.categories': 'Danh Mục',
    'home.loadMore': 'Xem Thêm',
    // Common
    'readMore': 'Đọc Tiếp',
    'readingTime': 'phút đọc',
    'by': 'bởi',
    'relatedArticles': 'Bài Viết Liên Quan',
  },
};

export function LanguageProvider({
  children,
  defaultLanguage = 'en',
  storageKey = 'japan-housing-language',
}: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(
    () => (localStorage.getItem(storageKey) as Language) || defaultLanguage
  );
  
  const [translations, setTranslations] = useState(allTranslations[language] || allTranslations.en);

  // Update translations when language changes
  useEffect(() => {
    setTranslations(allTranslations[language] || allTranslations.en);
    localStorage.setItem(storageKey, language);
    // Update HTML lang attribute
    document.documentElement.lang = language;
  }, [language, storageKey]);

  // Translation function
  const t = (key: string): string => {
    return translations[key] || key;
  };

  return (
    <LanguageProviderContext.Provider
      value={{
        language,
        setLanguage,
        translations,
        t,
      }}
    >
      {children}
    </LanguageProviderContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageProviderContext);
  
  if (context === undefined)
    throw new Error("useLanguage must be used within a LanguageProvider");
    
  return context;
};