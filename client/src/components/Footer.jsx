import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="flex items-center justify-center bg-dark-purple bg-opacity-20 h-24 mt-10 w-full 	">
      <h2 className="text-gold text-4xl font-primary">{t('footer.title')}</h2>
    </footer>
  );
}
