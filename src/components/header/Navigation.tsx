
import { Link } from 'react-router-dom';

interface NavigationProps {
  categories: Array<{ name: string; path: string }>;
}

export const Navigation = ({ categories }: NavigationProps) => {
  return (
    <nav className="hidden lg:flex items-center space-x-8">
      {categories.map((category) => (
        <Link
          key={category.name}
          to={category.path}
          className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
        >
          {category.name}
        </Link>
      ))}
    </nav>
  );
};
